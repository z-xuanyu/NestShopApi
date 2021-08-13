/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2020-10-20 10:11:57
 * @LastEditTime: 2021-08-13 17:55:24
 * @Description: Modify here please
 */
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiParam } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CommoditiesService } from './commodities.service';
import { GetCommodityListDto } from './dto/getCommodityList.dto';
import { Commodity } from '@libs/db/models/commodity.model';
import { BaseResponseResult, TableResponseResult } from 'src/BaseResponseResult';
import { AddCommodityDto } from './dto/addCommodity.dto';
import { UpdateCommodityDto } from './dto/updateCommodity.dto';

@Controller('commodities')
@ApiTags('后台商品管理')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class CommoditiesController {
  constructor(private commodityService:CommoditiesService) {}

  @Get()
  @ApiOperation({ summary: "商品列表" })
  async getCommodities(@Query() parameters: GetCommodityListDto): Promise<BaseResponseResult<TableResponseResult<Commodity>>>{
    const result = await this.commodityService.getCommodityList(parameters)
    return {
      code: 1,
      result,
      message: '成功',
    };
  }

  @Post()
  @ApiOperation({ summary: '添加商品' })
  async addCommodity(@Body() parameters: AddCommodityDto):Promise<BaseResponseResult<Commodity>>{
    const result = await this.commodityService.addCommodity(parameters)
    return {
      code: 1,
      result,
      message: '成功',
    };
  }


  @Patch(":id")
  @ApiParam({ name:'id', description:'商品id' })
  @ApiOperation({ summary: '编辑更新商品' })
  async updateCommodity(@Param('id') id:string, @Body() parameters: UpdateCommodityDto):Promise<BaseResponseResult<Commodity>>{
    const result = await this.commodityService.updateCommodity(id, parameters)
    return {
      code: 1,
      result,
      message: '成功',
    };
  }


  @Delete(":id")
  @ApiParam({ name:'id', description:'商品id' })
  @ApiOperation({ summary: '商品' })
  async delCommodity(@Param('id') id:string,) :Promise<BaseResponseResult<Commodity>>{
    const result = await this.commodityService.delCommodity(id)
    return {
      code: 1,
      result,
      message: '成功',
    };
  }
}
