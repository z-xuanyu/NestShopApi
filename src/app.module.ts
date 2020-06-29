import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DbModule } from '@libs/db';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
@Module({
  imports: [DbModule, UsersModule, CategoriesModule],
  controllers: [AppController]
})
export class AppModule {}
