import { Module } from '@nestjs/common';
import { ProtalGoodsController } from './protal-goods.controller';
import { ProtalGoodsService } from './protal-goods.service';

@Module({
  controllers: [ProtalGoodsController],
  providers: [ProtalGoodsService]
})
export class ProtalGoodsModule {}
