/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2020-12-11 15:25:17
 * @LastEditTime: 2021-09-06 15:10:27
 * @Description: Modify here please
 */
import { Controller, Delete, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CommoditiesRatingService } from './commodities-rating.service';
import { GetCommoditiesRatingsDto } from './dto/commoditiesRating.dto';
import { BaseResponseResult } from 'src/BaseResponseResult';
import { CommoditiesRating } from '@libs/db/models/commoditiesRating.model';

@Controller('commodities-rating')
@ApiTags('后台商品评价管理')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class CommoditiesRatingController {
    constructor(private commoditiesRatingService: CommoditiesRatingService){};

  @Get()
  @ApiOperation({ summary: '商品评论列表' })
  async getCommoditiesRatings(@Query() parameters: GetCommoditiesRatingsDto ): Promise<any> {
    const result = await this.commoditiesRatingService.getCommoditiesRatings(parameters)
    return {
      code:1,
      message: '成功',
      result
    }
  }


  @Delete(":id")
  @ApiParam({ name:'id',description:"商品评论记录id" })
  @ApiOperation({ summary: '删除商品评论记录' })
  async delCommoditiesRating(@Param("id") id:string):Promise<BaseResponseResult<CommoditiesRating>>{
    const result = await this.commoditiesRatingService.delCommoditiesRating(id)
    return {
      code:1,
      message: '成功',
      result
    }
  }
}
