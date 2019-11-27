import { IsEmail, IsString } from 'class-validator';
import { Message } from '../../config/messages';

export class LoginUserDto {
  @IsEmail({}, { message: new Message().message.ValidEmail })
  email: string;

  @IsString({ message: new Message().message.ValidPassword })
  password: string;
}
