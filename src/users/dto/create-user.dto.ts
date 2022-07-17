import { IsEmail, IsString, Matches, MinLength, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @ApiProperty({
    description: 'The user`s name.',
    example: 'Jullian',
  })
  username: string;

  @IsEmail()
  @ApiProperty({
    example: 'stranger@outlook.com',
    description: 'Email to be created',
  })
  email: string;

  @IsString()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    // checks if the password is weak
    message:
      'weak password:must have at least 1 lowercase, 1 uppercase, 1 simbol and 1 number.',
  })
  @ApiProperty({
    example: 'Abcd@1234',
    description:
      'Password must have at least 1 lowercase, 1 uppercase, 1 simbol and 1 number.',
  })
  password: string;

  @ApiProperty({
    description: 'The password confirmation must be the same as the password',
    example: 'Abcd@1234',
  })
  confirmPassword: string;

  @IsUrl()
  @ApiProperty({
    description: 'User profile image',
    example: 'https://avatars.githubusercontent.com/u/88009922',
  })
  image: string;
}
