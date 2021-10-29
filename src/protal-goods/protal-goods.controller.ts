/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-09-07 14:38:08
 * @LastEditTime: 2021-10-29 11:09:50
 * @Description: Modify here please
 */
import { ParseIdPipe } from '@app/common/pipe/parse.id.pipe';
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CommoditiesService } from 'src/commodities/commodities.service';
import { GetCommodityListDto } from 'src/commodities/dto/getCommodityList.dto';
import { AddGoodssRatingDto } from './dto/protalGoodsRating.dto';
import { ProtalGoodsService } from './protal-goods.service';

@Controller('protalGoods')
@ApiTags('客户端商品相关')
export class ProtalGoodsController {
    constructor(private protalGoodsService: ProtalGoodsService, private commodityService: CommoditiesService) { };

    @Get("detail/:id")
    @ApiParam({ name: 'id', description: '商品id' })
    @ApiOperation({ summary: "获取商品详情" })
    async getGoodsDetail(@Param('id', new ParseIdPipe()) id: string,): Promise<any> {
        const result = await this.protalGoodsService.getGoodsDetail(id);
        return {
            code: 1,
            result,
            message: '成功',
        };
    }

    @Post("rating")
    @ApiOperation({ summary: '添加商品评论' })
    async addGoddsRating(@Body() parameters: AddGoodssRatingDto): Promise<any> {
        const result = await this.protalGoodsService.addGoodsRating(parameters);
        return {
            code: 1,
            message: '成功',
            result
        }
    }

    @Get("search")
    @ApiOperation({ summary: '搜索商品' })
    async searchGoods(@Query() parameters: GetCommodityListDto): Promise<any> {
        const result = await this.commodityService.getCommodityList(parameters);
        return result;
    }
}
