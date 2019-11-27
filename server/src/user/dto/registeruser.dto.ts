import { IsEmail, IsString, Length, IsNumber, Min, Max } from 'class-validator';
import { Message } from '../../config/messages';

export class RegisterUserDto {
  @IsEmail({}, { message: new Message().message.ValidEmail })
  email: string;

  @IsString({ message: new Message().message.ValidPassword })
  @Length(32, 32, { message: new Message().message.ValidPassword })
  password: string;

  @IsString({ message: new Message().message.EnterFullName })
  @Length(1, 100, { message: new Message().message.FullnameLimit })
  full_name: string;

  @IsNumber({}, { message: new Message().message.EnterMobile })
  @Min(1000000000)
  @Max(9999999999)
  mobile: number;
}
