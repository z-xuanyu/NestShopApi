/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-09-06 14:45:32
 * @LastEditTime: 2021-09-07 16:19:56
 * @Description: Modify here please
 */
import { CommoditiesRating } from '@libs/db/models/commoditiesRating.model';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { GetCommoditiesRatingsDto } from './dto/commoditiesRating.dto';

@Injectable()
export class CommoditiesRatingService {
    constructor(@InjectModel(CommoditiesRating) private readonly commoditiesModel: ReturnModelType<typeof CommoditiesRating> ){};

    // 获取商品评论列表
    async getCommoditiesRatings(parameters: GetCommoditiesRatingsDto):Promise<Array<CommoditiesRating>>{
        const result = await this.commoditiesModel
        .find()
        .populate("commoditiesId")
        .populate("memberId")
        .limit(~~parameters.pageSize)
        .skip(~~((parameters.pageNumber - 1) * parameters.pageSize));
        return result;
    }

    // 删除商品评论
    async delCommoditiesRating(id: string):Promise<CommoditiesRating>{
        const result = await this.commoditiesModel.findByIdAndDelete(id);
        if(!result) {
            throw new HttpException('系统异常，请联系管理员', HttpStatus.OK);
        }
        return result;
    }

    // 回复评论
    async replyComment(id: string, content: string):Promise<CommoditiesRating>{
        const result = await this.commoditiesModel.findByIdAndUpdate(id, { replyContent: content });
        if(!result) {
            throw new HttpException('系统异常，请联系管理员', HttpStatus.OK);
        }
        return result;
    }
}
