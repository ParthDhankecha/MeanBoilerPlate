import { Controller, Post, Get, UseGuards, Req, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/loginuser.dto';
import { RegisterUserDto } from './dto/registeruser.dto';
import { ResetTokenDto } from './dto/resettoken.dto';
import { AuthGuard } from '@nestjs/passport';
import { ResetPasswordDto } from './dto/reset-password.dto';

// @Crud({
//   model: {
//     type: User,
//   },
// })
@Controller('user')
export class UserController {
  constructor(public _userService: UserService) {}

  @Post('login-user')
  getUserData(@Body() user: LoginUserDto) {
    return this._userService.loginUser(user);
  }

  @Post('register-user')
  registerUser(@Body() user: RegisterUserDto) {
    return this._userService.registerUser(user);
  }

  @Post('request-reset-password')
  generateResetToken(@Body() data: ResetTokenDto) {
    return this._userService.generateResetToken(data.email);
  }

  @Post('reset-password')
  @UseGuards(AuthGuard())
  resetPassword(@Body() data: ResetPasswordDto, @Req() req) {
    if (req.headers.authorization == 'Bearer ' + data.token) {
      return this._userService.resetPassword(data);
    } else {
      return { status: 400, message: 'Enter valid token.' };
    }
  }
}
