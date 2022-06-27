import { IsNumber, IsPositive, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'The user`s age.',
    example: 18,
  })
  age: number;

  @IsString()
  @ApiProperty({
    description: 'The user`s name.',
    example: "Jullian",
  })
  name: string;

  @IsString()
  @ApiProperty({
    description: 'The user`s date of birth.',
    example: "19/01/1993",
  })
  birth: string;
}