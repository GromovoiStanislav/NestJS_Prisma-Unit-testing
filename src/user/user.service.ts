import { ForbiddenException, Injectable } from '@nestjs/common';
import { Prisma } from "@prisma/client";
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {

  constructor(
    private prisma: PrismaService
  ) {}

  createUser(email: string, firstName: string, lastName: string) {
    return this.prisma.user
      .create({
        data: {
          email,
          firstName,
          lastName,
        },
      })
      .catch((error) => {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            throw new ForbiddenException('User already exists');
          }
        }
        throw error;
      });
  }
}
