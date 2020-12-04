import { Module } from '@nestjs/common';
import { NavigatorController } from './navigator.controller';

@Module({
  controllers: [NavigatorController]
})
export class NavigatorModule {}
