/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-09-08 10:12:04
 * @LastEditTime: 2021-09-08 15:07:08
 * @Description: Modify here please
 */
import { Banner } from '@libs/db/models/banner.model';
import { Commodity } from '@libs/db/models/commodity.model';
import { Navigator } from '@libs/db/models/navigator.model';
import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';

@Injectable()
export class ProtalHomeService {
    constructor(
        // 注入banner
        @InjectModel(Banner) private readonly bannerModel: ReturnModelType<typeof Banner>,
        // 注入商品
        @InjectModel(Commodity) private commodityModel: ReturnModelType<typeof Commodity>,
        // 注入导航
        @InjectModel(Navigator) private navigatorModel: ReturnModelType<typeof Navigator>,
    ) { };

    // 获取首页banner
    async getBanners(): Promise<Array<Banner>> {
        const result = await this.bannerModel.find().limit(5);
        return result;
    }

    // 获取首页导航列表
    async getNavigators(): Promise<Array<Navigator>>{
        const result  = await this.navigatorModel.find()
        return result;
    }


    // 获取6条商品
    async getCommoditys(): Promise<Array<Commodity>>{
        const result = await this.commodityModel.find().limit(6);
        return result;
    }
}
