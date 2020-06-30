import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DbModule } from '@libs/db';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { MulterModule } from '@nestjs/platform-express';
@Module({
  imports: [
    MulterModule.register({
      dest: 'uploads',
    }),
    DbModule,
    UsersModule,
    CategoriesModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
