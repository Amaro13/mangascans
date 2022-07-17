import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { handleError } from 'src/utils/handle-error.util';

@Injectable()
export class UserService {
  private userSelect = {
    id: true,
    username: true,
    email: true,
    password: false,
    image: true,
    createdAt: true,
    updatedAt: true,
  };

  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserDto): Promise<User> {
    if (dto.password != dto.confirmPassword) {
      //it's checking here if the password is correct
      throw new BadRequestException('The password is incorrect.'); // if it's incorrect, this returns.
    }

    delete dto.confirmPassword;

    const data: CreateUserDto = {
      ...dto,
      password: await bcrypt.hash(dto.password, 10),
    };

    return this.prisma.user
      .create({ data, select: this.userSelect })
      .catch(handleError);
  }

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany({
      select: this.userSelect,
    });
  }

  async verifyIdAndReturnUser(id: string): Promise<User> {
    const user: User = await this.prisma.user.findUnique({
      where: { id },
      select: this.userSelect,
    });

    if (!user) {
      throw new NotFoundException(`Register with the id:'${id}' not found.`);
    }

    return user;
  }

  findOne(id: string): Promise<User> {
    return this.verifyIdAndReturnUser(id);
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    await this.verifyIdAndReturnUser(id);

    if (dto.password) {
      //checks if the dto you are using has a password
      if (dto.password != dto.confirmPassword) {
        // if it has a password is it correct?
        throw new BadRequestException('The passwords are not the same.');
      }
    }

    delete dto.confirmPassword;

    const data: Partial<User> = { ...dto };

    if (data.password) {
      //encrypts the password
      data.password = await bcrypt.hash(data.password, 10);
    }

    return this.prisma.user
      .update({ where: { id }, data, select: this.userSelect })
      .catch(handleError);
  }

  async remove(id: string) {
    await this.verifyIdAndReturnUser(id);

    return this.prisma.user.delete({
      where: { id },
      select: { username: true, email: true },
    });
  }
}
