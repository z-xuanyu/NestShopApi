import { Module } from '@nestjs/common';
import { CommoditiesController } from './commodities.controller';

@Module({
  controllers: [CommoditiesController]
})
export class CommoditiesModule {}
