import { IsEmail } from 'class-validator';
import { Message } from '../../config/messages';

export class ResetTokenDto {
  @IsEmail({}, { message: new Message().message.ValidEmail })
  email: string;
}
