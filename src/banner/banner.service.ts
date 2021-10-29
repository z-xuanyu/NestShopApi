/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-08-09 10:33:08
 * @LastEditTime: 2021-10-29 10:53:47
 * @Description: Banner模块业务服务模块
 */
import { Banner } from '@libs/db/models/banner.model';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { AddBannerDto } from './dto/addBanner.dto';
import { GetBannersDto } from './dto/getBanners.dto';
import { UpdateBannerDto } from './dto/updateBanner.dto';


@Injectable()
export class BannerService {
    constructor(@InjectModel(Banner) private readonly bannerModel: ModelType<Banner>) { }

    // 获取banner列表
    async getBanners(parameters: GetBannersDto): Promise<Array<Banner>> {
        const result = await this.bannerModel.find({ name: { $regex: new RegExp(parameters.name, 'i') } }).populate("commodityId").limit(~~parameters.pageSize).skip(~~((parameters.pageNumber - 1) * parameters.pageSize))
        return result;
    }


    // 添加banner
    async addBanner(parameters: AddBannerDto): Promise<Banner> {
        const result = await this.bannerModel.create(parameters as any)
        if (!result) {
            throw new HttpException('系统异常，请联系管理员', HttpStatus.OK);
        }
        return result;
    }


    // 更新banner
    async updateBanner(id: string, parameters: UpdateBannerDto): Promise<Banner> {
        const result = await this.bannerModel.findByIdAndUpdate(id, parameters as any)
        if (!result) {
            throw new HttpException('系统异常，请联系管理员', HttpStatus.OK);
        }
        return result;
    }


    // 删除banner
    async delBanner(id: string): Promise<Banner> {
        const result = await this.bannerModel.findByIdAndDelete(id)
        if (!result) {
            throw new HttpException('系统异常，请联系管理员', HttpStatus.OK);
        }
        return result
    }

}
