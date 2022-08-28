import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FavoriteMangaDto } from './dto/favorite-manga.dto';
import { Favorite } from './entities/favorite.entity';
import { FavoritesService } from './favorites.service';

@ApiTags('favorites')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get('')
  @ApiOperation({
    summary: 'List all favorites',
  })
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post()
  @ApiOperation({
    summary: 'Favorite a manga',
  })
  favoriteManga(@Body() dto: FavoriteMangaDto): Promise<Favorite> {
    return this.favoritesService.favoriteManga(dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Unfavorite a manga',
  })
  unfavoriteManga(@Param('id') id: string) {
    return this.favoritesService.unfavoriteManga(id);
  }

  @Get('user/:id')
  @ApiOperation({
    summary: 'List all the user`s favorites',
  })
  getUserFavorites(@Param('id') id: string): Promise<Favorite[]> {
    return this.favoritesService.getUserFavorites(id);
  }

  @Get('manga/:id')
  @ApiOperation({
    summary: 'List all user`s that favorited this manga',
  })
  getUsersWhoFavoritedManga(@Param('id') id: string) {
    return this.favoritesService.getUsersWhoFavoritedManga(id);
  }
}
