import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginUserDto } from './dto/loginuser.dto';
import { Message } from '../config/messages';
import { JwtService } from '@nestjs/jwt';
import { Config } from '../config.class';
import { ConfigService } from '../config/config.service';
import { RegisterUserDto } from './dto/registeruser.dto';

@Injectable()
export class UserService extends TypeOrmCrudService<User> {
  private messages;
  constructor(@InjectRepository(User) repo, private _jwtService: JwtService) {
    super(repo);
  }

  async loginUser(user: LoginUserDto) {
    let users = await this.repo.find({ email: user.email });
    if (users.length > 0) {
      if (users[0].password.toLowerCase() === user.password.toLowerCase()) {
        let token = this._jwtService.sign(
          { id: users[0].id },
          {
            expiresIn: new ConfigService().get('TOKEN_EXPIRE_TIME').toString(),
          },
        );
        let refreshToken = this._jwtService.sign({ id: users[0].id });
        return {
          status: 1,
          message: new Message().message.LoginSuccess,
          token: token,
          refreshToken: refreshToken,
        };
      } else {
        return {
          status: 0,
          message: new Message().message.UserPasswordNotMatch,
        };
      }
    } else {
      return { status: 0, message: new Message().message.ValidEmail };
    }
  }

  async registerUser(user: RegisterUserDto) {
    let data = await this.repo.find({
      where: [{ email: user.email }, { mobile: user.mobile }],
    });
    if (data.length > 0) {
      if (data[0].email == user.email) {
        return { status: 0, message: new Message().message.EmailRegistered };
      } else {
        return { status: 0, message: new Message().message.MobileRegistered };
      }
    } else {
      let result = await this.repo.insert({
        email: user.email,
        password: user.password,
        mobile: user.mobile,
        full_name: user.full_name,
      });
      if (result.raw.affectedRows > 0) {
        return { status: 1, message: new Message().message.RegisteredSuccess };
      } else {
        return { status: 0, message: new Message().message.NotRegistered };
      }
    }
  }

  async generateResetToken(username) {
    let data = await this.repo.find({ email: username });
    if (data.length > 0) {
      if (
        data[0].attempt_count > 2 &&
        new Date(data[0].added_date).getDate() == new Date().getDate() &&
        new Date(data[0].added_date).getMonth() == new Date().getMonth() &&
        new Date(data[0].added_date).getFullYear() == new Date().getFullYear()
      ) {
        return {
          status: 400,
          message: 'You exeeded maximum request limit for forget password.',
        };
      } else {
        if (
          new Date(data[0].added_date).getDate() != new Date().getDate() ||
          new Date(data[0].added_date).getMonth() != new Date().getMonth() ||
          new Date(data[0].added_date).getFullYear() != new Date().getFullYear()
        ) {
          await this.repo.update(
            { id: data[0].id },
            { attempt_count: 0, added_date: new Date() },
          );
        }
        let token = this._jwtService.sign(
          { data: Math.random().toString() },
          {
            expiresIn: new ConfigService().get('RESETTOKENEXPIRE'),
          },
        );
        let result = await this.repo.update(
          { id: data[0].id },
          { reset_token: token },
        );
        if (result.raw.affectedRows > 0) {
          const nodemailer = require('nodemailer');
          var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'pmdhankecha.18@gmail.com',
              pass: 'Blue123526051999blue1234',
            },
          });
          let mailOptions = {
            from: 'youremail@gmail.com',
            to: data[0].email,
            subject: 'Reset Password | Logwin Technology',
            html:
              "<div><h3>Reset Password</h3></div><div style='margin-top:20px;'>For resetting the password go to the following link :</div><div style='margin-top:20px;'>" +
              new ConfigService().get('RESETURL') +
              token +
              "</div><div style='margin-top:20px; color:#EA4235'><b>Note :</b> &nbsp; Above URL is valid for next 30 minutes.</div>",
          };
          transporter.sendMail(mailOptions, async (err, info) => {
            if (err) {
              return {
                status: '0',
                message: 'Request not proceede. Please try again later.',
              };
            } else {
              let sql =
                'update user set attempt_count=attempt_count+1 where id=' +
                data[0].id;
              await this.repo.query(sql);
            }
          });
          return {
            status: 200,
            message:
              'Forget Password request accepted successfully. Please check email.',
          };
        } else {
          return { status: 400, message: 'Please provide valid User Name' };
        }
      }
    } else {
      return { status: 400, message: 'Please provide valid User Name' };
    }
  }

  async resetPassword(data) {
    let user = await this.repo.find({
      reset_token: data.token,
    });
    if (user.length > 0) {
      let result = await this.repo.update(
        { id: user[0].id },
        { password: data.password, reset_token: '' },
      );
      if (result.raw.affectedRows > 0) {
        return { status: 200, message: 'Password updated successfully.' };
      } else {
        return {
          status: 400,
          message: 'Password can not be updated. Please try again later.',
        };
      }
    } else {
      return { status: 400, message: 'Please open the valid URL.' };
    }
  }
}
