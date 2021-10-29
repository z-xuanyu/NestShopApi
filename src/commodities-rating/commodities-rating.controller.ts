/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2020-12-11 15:25:17
 * @LastEditTime: 2021-10-29 11:00:55
 * @Description: 商品评价控制器模块
 */
import { Body, Controller, Delete, Get, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CommoditiesRatingService } from './commodities-rating.service';
import { GetCommoditiesRatingsDto, ReplyCommentDto } from './dto/commoditiesRating.dto';
import { BaseResponseResult } from 'src/BaseResponseResult';
import { CommoditiesRating } from '@libs/db/models/commoditiesRating.model';
import { ParseIdPipe } from '@app/common/pipe/parse.id.pipe';

@Controller('commodities-rating')
@ApiTags('商品评价管理')
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
  async delCommoditiesRating(@Param("id", new ParseIdPipe()) id:string):Promise<BaseResponseResult<CommoditiesRating>>{
    const result = await this.commoditiesRatingService.delCommoditiesRating(id)
    return {
      code:1,
      message: '成功',
      result
    }
  }

  @Patch(":id")
  @ApiParam({ name:'id',description:"商品评论记录id" })
  @ApiOperation({ summary: '回复评论' })
  async replyComment(@Body() parameters: ReplyCommentDto, @Param("id", new ParseIdPipe()) id: string):Promise<BaseResponseResult<CommoditiesRating>>{
    const result = await this.commoditiesRatingService.replyComment(id, parameters.content);
    return {
      code:1,
      message: '成功',
      result
    }
  }
}
