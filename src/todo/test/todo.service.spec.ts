import { TodoStatus } from '.prisma/client';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTodoDto } from '../dto';
import { TodoService } from '../todo.service';

describe('TodoService', () => {
  let prisma: PrismaService;
  let todoService: TodoService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    prisma = moduleRef.get(PrismaService);
    todoService = moduleRef.get(TodoService);
    await prisma.cleanDatabase();
  });

  describe('createTodo()', () => {
    let userId: number;

    const dto: CreateTodoDto = {
      title: 'First todo',
      description: 'First todo description',
    };

    const userDto = {
      email: "john@skynet.com",
      firstName: "John",
      lastName: "Connor"
    };

    it('should create user', async () => {
      const user = await prisma.user.create({
        data: userDto
      });
      userId = user.id;
    });

    it('should create todo', async () => {
      const todo = await todoService.createTodo(userId, dto);
      expect(todo.title).toBe(dto.title);
      expect(todo.description).toBe(dto.description);
      expect(todo.status).toBe(TodoStatus.OPEN);
    });

    it('should throw on duplicate title', async () => {
      await todoService
        .createTodo(userId, dto)
        .then((todo) => expect(todo).toBeUndefined())
        .catch((error) => expect(error.status).toBe(403));
    });

  });

});
