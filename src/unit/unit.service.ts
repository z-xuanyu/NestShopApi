/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-08-10 11:16:44
 * @LastEditTime: 2021-08-10 14:11:22
 * @Description: Modify here please
 */
import { Unit } from '@libs/db/models/unit.model';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { AddOrUpdateUnitDto } from './dto/addOrUpdateUnit.dto';
import { GetUnitsDto } from './dto/getUnits.dto';

@Injectable()
export class UnitService {
    constructor(@InjectModel(Unit) private readonly unitModel: ReturnModelType<typeof Unit>){}


    // 获取单位列表
    async getUnits(parameters: GetUnitsDto):Promise<Array<Unit>>{
        const result = await this.unitModel.find({ name: { $regex: new RegExp(parameters.name, 'i') } }).limit(~~parameters.pageSize).skip(~~((parameters.pageNumber - 1) * parameters.pageSize))
        return result
    }

    
    // 添加单位
    async addUnit(parameters:AddOrUpdateUnitDto):Promise<Unit>{
        const result = await this.unitModel.create(parameters as Unit)
        if(!result) {
            throw new HttpException('系统异常，请联系管理员', HttpStatus.OK);
        }
        return result;
    }


    // 更新单位信息
    async updateUnit(id:string, parameters: AddOrUpdateUnitDto):Promise<Unit>{
        const result = await this.unitModel.findByIdAndUpdate(id, parameters)
        if(!result) {
            throw new HttpException('系统异常，请联系管理员', HttpStatus.OK);
        }
        return result;
    }


    // 删除单位
    async delUnit(id:string):Promise<Unit>{
        const result = await this.unitModel.findByIdAndDelete(id)
        if(!result) {
            throw new HttpException('系统异常，请联系管理员', HttpStatus.OK);
        }
        return result;
    }
}
