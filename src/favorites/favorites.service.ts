import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { Manga } from 'src/manga/entities/manga.entity';
import { User } from 'src/users/entities/user.entity';
import { handleError } from 'src/utils/handle-error.util';
import { FavoriteMangaDto } from './dto/favorite-manga.dto';
import { Favorite } from './entities/favorite.entity';

@Injectable()
export class FavoritesService {
  constructor(private readonly prisma: PrismaService) {}

  async favoriteManga(dto: FavoriteMangaDto): Promise<Favorite> {
    await this.verifyUserId(dto.userId);

    const manga: Manga = await this.prisma.manga.findUnique({
      where: { name: dto.mangaName },
    });

    if (!manga) {
      throw new NotFoundException(
        `Manga with the name '${dto.mangaName}' not found`,
      );
    }

    const data: Prisma.FavoriteCreateInput = {
      user: {
        connect: {
          id: dto.userId,
        },
      },
      manga: {
        connect: {
          name: dto.mangaName,
        },
      },
    };

    return this.prisma.favorite.create({ data }).catch(handleError);
  }

  async unfavoriteManga(id: string) {
    const favorite: Favorite = await this.prisma.favorite.findUnique({
      where: { id },
    });

    if (!favorite) {
      throw new NotFoundException(`Id entry:'${id}' not found`);
    }

    return this.prisma.favorite.delete({ where: { id } });
  }

  async getUserFavorites(id: string): Promise<Favorite[]> {
    await this.verifyUserId(id);

    return this.prisma.favorite.findMany({ where: { userId: id } });
  }

  async getUsersWhoFavoritedManga(id: string) {
    const manga: Manga = await this.prisma.manga.findUnique({
      where: { id },
    });

    if (!manga) {
      throw new NotFoundException(`Id entry:'${id}' not found`);
    }

    return this.prisma.favorite.findMany({ where: { manga: { id } } });
  }

  async verifyUserId(id: string): Promise<void | never> {
    const user: User = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`Id entry:'${id}' not found`);
    }
  }
}
