/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-08-31 11:55:28
 * @LastEditTime: 2021-08-31 12:15:46
 * @Description: Modify here please
 */
import { Navigator } from '@libs/db/models/navigator.model';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { AddNavigatorDto, GetNavigatorDto, UpdateNavigatorDto } from './dto/navigators.dto';

@Injectable()
export class NavigatorService {
    constructor(@InjectModel(Navigator) private readonly navigatorModel: ReturnModelType<typeof Navigator>){};

    // 获取导航列表
    async getNavigator(parameters: GetNavigatorDto):Promise<Array<Navigator>>{
        const result = await this.navigatorModel.find({ name: { $regex: new RegExp(parameters.name, 'i') } }).limit(~~parameters.pageSize).skip(~~((parameters.pageNumber - 1) * parameters.pageSize));
        return result;
    }


    // 添导航
    async addNavigator(parameters: AddNavigatorDto):Promise<Navigator>{
        const result = await this.navigatorModel.create(parameters as Navigator);
        if(!result) {
            throw new HttpException('系统异常，请联系管理员', HttpStatus.OK);
        }
        return result;
    }

    // 编辑导航
    async updateNavigator(id: string ,parameters: UpdateNavigatorDto):Promise<Navigator>{
        const result = await this.navigatorModel.findByIdAndUpdate(id, parameters)
        if(!result) {
            throw new HttpException('系统异常，请联系管理员', HttpStatus.OK);
        }
        return result; 
    }

    // 删除导航
    async delNavigator(id: string):Promise<Navigator>{
        const result = await this.navigatorModel.findByIdAndDelete(id)
        if(!result) {
            throw new HttpException('系统异常，请联系管理员', HttpStatus.OK);
        }
        return result;
    }
}
