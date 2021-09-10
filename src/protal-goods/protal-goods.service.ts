/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-09-07 14:38:24
 * @LastEditTime: 2021-09-10 09:57:39
 * @Description: Modify here please
 */
import { CommoditiesRating } from '@libs/db/models/commoditiesRating.model';
import { Commodity } from '@libs/db/models/commodity.model';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { AddGoodssRatingDto } from './dto/protalGoodsRating.dto';

@Injectable()
export class ProtalGoodsService {
    constructor(
        // 注入商品评论
        @InjectModel(CommoditiesRating) private readonly commoditiesModel: ReturnModelType<typeof CommoditiesRating>, 
        // 注入商品
        @InjectModel(Commodity) private commodityModel: ReturnModelType<typeof Commodity>
     ) { };


    // 获取商品详情
    async getGoodsDetail(id: string): Promise<Commodity> {
        // 更新商品浏览量
        await this.commodityModel.findOneAndUpdate({ _id: id }, { $inc:{ views: 1 } })
        // 商品信息
        const result = await this.commodityModel.findById(id);
        return result;
    }

    // 添加商品评论
    async addGoodsRating(parameters: AddGoodssRatingDto): Promise<CommoditiesRating> {
        const result = await this.commoditiesModel.create(parameters as any);

        if (!result) {
            throw new HttpException('系统异常，请联系管理员', HttpStatus.OK);
        }

        return result;
    }
}
