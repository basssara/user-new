import { IsNotEmpty, IsString } from 'class-validator';
import { UserRequest } from './user.interface';

export class UserRequestDto implements Omit<UserRequest, 'id'> {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
