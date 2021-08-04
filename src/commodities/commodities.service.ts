/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-08-03 18:00:15
 * @LastEditTime: 2021-08-03 18:34:39
 * @Description: Modify here please
 */
import { Commodity } from '@libs/db/models/commodity.model';
import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';

@Injectable()
export class CommoditiesService {
    constructor(@InjectModel(Commodity) private commodityModel: ReturnModelType<typeof Commodity>){}

    // 获取商品列表
    async getCommodityList():Promise<Array<Commodity>>{
        const reslut = await this.commodityModel.find()
        return reslut
    }
}
