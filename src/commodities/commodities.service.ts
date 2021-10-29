/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-08-03 18:00:15
 * @LastEditTime: 2021-10-29 10:58:21
 * @Description: 商品业务服务模块
 */
import { Commodity } from '@libs/db/models/commodity.model';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { TableResponseResult } from 'src/BaseResponseResult';
import { AddCommodityDto } from './dto/addCommodity.dto';
import { GetCommodityListDto } from './dto/getCommodityList.dto';
import { UpdateCommodityDto } from './dto/updateCommodity.dto';

@Injectable()
export class CommoditiesService {
    constructor(@InjectModel(Commodity) private commodityModel: ReturnModelType<typeof Commodity>) { }


    // 获取商品列表
    async getCommodityList(parameters: GetCommodityListDto): Promise<TableResponseResult<Commodity>> {
        const total = await this.commodityModel.countDocuments();
        const reslut = await this.commodityModel
            .find({ name: { $regex: new RegExp(parameters.name, 'i') } })
            .populate("categories")
            .limit(~~parameters.pageSize)
            .skip(~~((parameters.pageNumber - 1) * parameters.pageSize))
        return {
            items: reslut,
            total
        };
    }


    // 添加商品
    async addCommodity(parameters: AddCommodityDto): Promise<Commodity> {
        const result = await this.commodityModel.create(parameters as any)
        if (!result) {
            throw new HttpException('系统异常，请联系管理员', HttpStatus.OK);
        }
        return result;
    }


    // 更新商品
    async updateCommodity(id:string ,parameters:UpdateCommodityDto) : Promise<Commodity>{
        const result = await this.commodityModel.findByIdAndUpdate(id,parameters as any )
        if (!result) {
            throw new HttpException('系统异常，请联系管理员', HttpStatus.OK);
        }
        return result;  
    }

    
    // 删除商品
    async delCommodity(id: string):Promise<Commodity>{
        const result = await this.commodityModel.findByIdAndDelete(id);
        if (!result) {
            throw new HttpException('系统异常，请联系管理员', HttpStatus.OK);
        }
        return result; 
    }
}
