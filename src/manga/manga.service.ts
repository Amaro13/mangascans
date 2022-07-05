import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMangaDto } from './dto/create-manga.dto';
import { UpdateMangaDto } from './dto/update-manga.dto';
import { Manga } from './entities/manga.entity';

@Injectable()
export class MangaService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Manga[]> {
    const newLocal = await this.prisma.manga.findMany();
    return newLocal; //return all the items in the prisma.manga
  }

  async findById(id: string): Promise<Manga> {
    const record = await this.prisma.manga.findUnique({ where: { id } }); //return the item where the value id is equal to the one informed from the prisma.manga

    if (!record) {
      throw new NotFoundException(`Register with the id:'${id}' not found.`);
    }

    return record;
  }

  async findOne(id: string): Promise<Manga> {
    return this.findById(id);
  }

  async create(dto: CreateMangaDto): Promise<Manga> { //Promise<Manga> this is the return of the promise, the value that has to be included is the varible whithin the create(here), in this case the dto is the variable CreateMangaDto
    const data: CreateMangaDto = { ...dto }; //this creates an item called manga that has an id(as optional in the entity) and all the info from the createMangaDto using the spread(...) operator. If you name the receiving as data, you can just use the data in the create method, since the key and value is of the same name

    const newmanga = await this.prisma.manga.create({ data }).catch(this.handleError);
    return newmanga; // this returns the new data manga(since it has the name data you can just write data instead of data:data) to the prisma manga with the id getting created automatically with the ORM. If an error occurs it prints the error and returns undefined.
  }

  async update(id: string, dto: UpdateMangaDto): Promise<Manga> {
    await this.findById(id);
    const data: UpdateMangaDto = { ...dto }; // here you are using the Partial <> to turn every value within, in this case the manga, into optional values

    return this.prisma.manga.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    await this.findById(id);
    await this.prisma.manga.delete({ where: { id } }); //deletes this item from the manga
  }

  handleError(error: Error): undefined {
    const errorLines = error.message?.split('\n');
    const lastErrorLine = errorLines[errorLines.length - 1]?.trim();
    throw new UnprocessableEntityException(
      lastErrorLine || 'Some undefined error occurred',
    ); // this is magic, if it fails to proccess in any case, it returns the error
  }
}
