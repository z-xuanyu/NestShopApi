/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2020-12-11 15:25:28
 * @LastEditTime: 2021-09-07 11:16:28
 * @Description: Modify here please
 */
import { Module } from '@nestjs/common';
import { CommoditiesRatingController } from './commodities-rating.controller';
import { CommoditiesRatingService } from './commodities-rating.service';

@Module({
  controllers: [CommoditiesRatingController],
  providers: [CommoditiesRatingService]
})
export class CommoditiesRatingModule {}
