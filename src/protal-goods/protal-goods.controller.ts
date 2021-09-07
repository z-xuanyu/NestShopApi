/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-09-07 14:38:08
 * @LastEditTime: 2021-09-07 15:26:30
 * @Description: Modify here please
 */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { AddGoodssRatingDto } from './dto/protalGoodsRating.dto';
import { ProtalGoodsService } from './protal-goods.service';

@Controller('protalGoods')
@ApiTags('客户端商品相关')
export class ProtalGoodsController {
    constructor(private protalGoodsService: ProtalGoodsService) { };

    @Get(":id")
    @ApiParam({ name: 'id', description: '商品id' })
    @ApiOperation({ summary: "获取商品详情" })
    async getGoodsDetail(@Param('id') id: string,): Promise<any> {
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
}
