import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { MangaModule } from './manga/manga.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UserModule, MangaModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
