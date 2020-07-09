import { Module } from '@nestjs/common';
import { ProtalHomeController } from './protal-home.controller';

@Module({
  controllers: [ProtalHomeController]
})
export class ProtalHomeModule {}
