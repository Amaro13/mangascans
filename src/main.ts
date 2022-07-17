import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express'; //

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  }); // with this cors security as true, anyone can access the data inserted with a fetch freely

  // To get the https protocol
  app.set('trust proxy', 1);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder() //this creates a documentBuilder for validation with swagger
    .setTitle('MangaScans')
    .setDescription('App for getting your best reading online')
    .setVersion('1.0.0')
    .addTag('status')
    .addTag('auth')
    .addTag('users')
    .addTag('mangas')
    .addTag('favorites')
    .addTag('genre')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3333);
}
bootstrap();
