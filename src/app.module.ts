import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma/prisma.module";
import { TodoModule } from "./todo/todo.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    PrismaModule,
    TodoModule,
    UserModule
  ]
})
export class AppModule {
}
