import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { MangaModule } from './manga/manga.module';
import { PrismaModule } from './prisma/prisma.module';
import { GenreModule } from './genre/genre.module';
import { FavoritesModule } from './favorites/favorites.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UserModule,
    MangaModule,
    PrismaModule,
    GenreModule,
    FavoritesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
