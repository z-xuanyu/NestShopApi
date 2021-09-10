/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2020-10-20 10:11:57
 * @LastEditTime: 2021-09-10 10:11:13
 * @Description: Modify here please
 */
import { Module } from '@nestjs/common';
import { CommoditiesController } from './commodities.controller';
import { CommoditiesService } from './commodities.service';

@Module({
  controllers: [CommoditiesController],
  providers: [CommoditiesService],
  exports: [ CommoditiesService ]
})
export class CommoditiesModule {}
