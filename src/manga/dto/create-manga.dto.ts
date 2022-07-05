import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateMangaDto {
  // @IsString()
  // @ApiProperty({
  //   description: 'Id of the manga',
  // })
  // id: string;

  // @IsDate()
  // @ApiProperty({
  //   description: 'Id of the manga',
  // })
  // createdAt: Date;

  // @IsDate()
  // @ApiProperty({
  //   description: 'Id of the manga',
  // })
  // updatedAt: Date;

  @IsString()
  @ApiProperty({
    description: 'Name of the manga',
    example: 'Solo Leveling',
  })
  name: string;

  @IsString()
  @ApiProperty({
    description: 'Manga Description',
    example:
      'Some super weak guy gets fucked over and then gets super powers and now is in route to become the strongest guy ever.',
  })
  description: string;

  @IsString()
  @ApiProperty({
    description: 'Manga Genre',
    example: 'Action',
  })
  genre: string;

  @IsNumber({
    maxDecimalPlaces: 1,
  })
  @ApiProperty({
    description: 'Number of chapters',
    example: 299,
  })
  chapters: number;

  @IsUrl()
  @ApiProperty({
    description: 'Manga Image',
    example:
      'https://www.asurascans.com/wp-content/uploads/2021/03/Solo_Leveling_Title_Cover_-_Barak.jpg',
  })
  image: string;
}
