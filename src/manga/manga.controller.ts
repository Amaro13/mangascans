import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { MangaService } from './manga.service';
import { CreateMangaDto } from './dto/create-manga.dto';
import { UpdateMangaDto } from './dto/update-manga.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('manga')
@Controller('manga')
export class MangaController {
  constructor(private readonly mangaService: MangaService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a Manga',
  })
  create(@Body() createMangaDto: CreateMangaDto) {
    return this.mangaService.create(createMangaDto);
  }

  @Get()
  @ApiOperation({
    summary: 'List all mangas',
  })
  findAll() {
    return this.mangaService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Find a manga by id',
  })
  findOne(@Param('id') id: string) {
    return this.mangaService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Edit a manga by id',
  })
  update(@Param('id') id: string, @Body() updateMangaDto: UpdateMangaDto) {
    return this.mangaService.update(id, updateMangaDto);
  }

  @Delete(':id')

  @ApiOperation({
    summary: 'Remove a manga by id',
  })
  delete(@Param('id') id: string) {
    this.mangaService.delete(id);
  }
}