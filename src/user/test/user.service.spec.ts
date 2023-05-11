import { Test } from "@nestjs/testing";
import { AppModule } from "../../app.module";
import { PrismaService } from "../../prisma/prisma.service";
import { UserService } from "../user.service";

describe("UserService", () => {
  let prisma: PrismaService;
  let userService: UserService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    prisma = moduleRef.get(PrismaService);
    userService = moduleRef.get(UserService);
    await prisma.cleanDatabase();
  });

  describe("createUser()", () => {

    const userDto = {
      email: "john@skynet.com",
      firstName: "John",
      lastName: "Connor"
    };

    it("should create user", async () => {
      const user = await userService.createUser(
        userDto.email,
        userDto.firstName,
        userDto.lastName
      );
      expect(user.email).toBe("john@skynet.com");
    });

    it("should throw on duplicate email", async () => {
      try {
        await userService.createUser(
          userDto.email,
          userDto.firstName,
          userDto.lastName
        );
      } catch (error) {
        expect(error.status).toBe(403);
      }
    });

  });

});
