import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(dto.password, 8);

    const data: CreateUserDto = {
      username: dto.username,
      email: dto.email,
      password: hashedPassword,
    };

    return this.prisma.user
      .create({ data })
      .catch(this.handleErrorConstraintUnique);
  }

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async verifyIdAndReturnUser(id: string): Promise<User> {
    const user: User = await this.prisma.user.findUnique({
      where: { id },
    });
    return user;
  }

  handleErrorConstraintUnique(error: Error): never {
    const splitedMessage = error.message.split('`');

    const errorMessage = `Entry '${
      splitedMessage[splitedMessage.length - 2]
    }' is not respecting the UNIQUE constraint`;

    throw new UnprocessableEntityException(errorMessage);
  }

  findOne(id: string): Promise<User> {
    return this.verifyIdAndReturnUser(id);
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    await this.verifyIdAndReturnUser(id);

    return this.prisma.user
      .update({ where: { id }, data: dto })
      .catch(this.handleErrorConstraintUnique);
  }

  async remove(id: string) {
    await this.verifyIdAndReturnUser(id);

    return this.prisma.user.delete({
      where: { id },
      select: { username: true, email: true },
    });
  }
}
