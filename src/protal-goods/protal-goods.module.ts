/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-09-07 14:37:50
 * @LastEditTime: 2021-09-10 10:13:03
 * @Description: Modify here please
 */
import { Module } from '@nestjs/common';
import { CommoditiesModule } from 'src/commodities/commodities.module';
import { ProtalGoodsController } from './protal-goods.controller';
import { ProtalGoodsService } from './protal-goods.service';

@Module({
  imports: [CommoditiesModule],
  controllers: [ProtalGoodsController],
  providers: [ProtalGoodsService]
})
export class ProtalGoodsModule {}
