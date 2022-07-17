import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const { username, password } = loginDto;

    // Searches and checks if the user exists using the username
    const user = await this.prisma.user.findUnique({ where: { username } });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Validates if the password is correct
    const isHashValid = await bcrypt.compare(password, user.password); // the bcrypt.compare(p,x) it takes a p value to be encrypted and compares to a x encrypted password and returns true of false if it's the same or false if it's different.

    if (!isHashValid) {
      throw new UnauthorizedException('Invalid user or password');
    }

    delete user.password;

    return {
      token: this.jwtService.sign({ username }), // this twtService is taken from the module conection, this method must be included in the module as it's imported from the jwt library
      user,
    };
  }
}
