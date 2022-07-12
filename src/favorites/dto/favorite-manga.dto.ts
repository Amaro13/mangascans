import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class FavoriteMangaDto {
  @IsUUID()
  @ApiProperty({
    description: 'User Id that is favoriting the manga',
    example: '85072848-002c-4083-9089-e252337436ec',
  })
  userId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Name of the manga',
    example: 'Solo Leveling',
  })
  mangaName: string;
}