import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto { // this is the login method that will comunicate with the user and authorize
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'User username',
    example: 'amaroribeiro',
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'User password',
    example: 'Abcd@1234',
  })
  password: string;
}