import { Todo } from '@prisma/client';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTodoDto } from './dto';
import { Prisma } from "@prisma/client";

@Injectable()
export class TodoService {

  constructor(
    private prisma: PrismaService
  ) {}

  createTodo(userId: number, dto: CreateTodoDto): Promise<Todo> {
    return this.prisma.todo
      .create({
        data: {
          userId,
          ...dto,
        },
      })
      .catch((error) => {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            throw new ForbiddenException('Duplicate todo title');
          }
        }
        throw error;
      });
  }

}
