import { IsString, Length } from 'class-validator';

export class ResetPasswordDto {
  @IsString()
  @Length(32, 32)
  password: string;

  @IsString()
  token: string;
}
