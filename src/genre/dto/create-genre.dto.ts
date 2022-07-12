import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGenreDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Name of manga genre',
    example: 'Action',
  })
  name: string;
}
