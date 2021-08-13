/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-08-13 10:46:54
 * @LastEditTime: 2021-08-13 11:08:01
 * @Description: Modify here please
 */
import { Category } from '@libs/db/models/category.model';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { TableResponseResult } from 'src/BaseResponseResult';
import { AddGoodsCategory } from './dto/addCategory.dto';
import { GetGoodsCategoriesDto } from './dto/getCategories.dto';
import { UpdateGoodsCategory } from './dto/updateCategory.dto';

@Injectable()
export class CategoriesService {
    constructor(@InjectModel(Category)
    private readonly categoryModel: ReturnModelType<typeof Category>) { }


    // 获取商品分类列表
    async getGoodsCategory(parameters: GetGoodsCategoriesDto): Promise<TableResponseResult<Category>> {
        const total = await this.categoryModel.countDocuments();
        const result = await this.categoryModel
            .find({ name: { $regex: new RegExp(parameters.name, 'i') } })
            .limit(~~parameters.pageSize)
            .skip(~~((parameters.pageNumber - 1) * parameters.pageSize))
        return {
            items: result,
            total
        };
    }


    // 添加商品分类
    async addCategory(parameters: AddGoodsCategory): Promise<Category> {
        const result = await this.categoryModel.create(parameters as Category)
        if (!result) {
            throw new HttpException('系统异常，请联系管理员', HttpStatus.OK);
        }
        return result;
    }


    // 编辑更新商品分类
    async updateGoodsCategory(id: string, parameters: UpdateGoodsCategory): Promise<Category> {
        const result = await this.categoryModel.findByIdAndUpdate(id, parameters)
        if (!result) {
            throw new HttpException('系统异常，请联系管理员', HttpStatus.OK);
        }
        return result;
    }


    // 删除商品分类
    async delGoodsCategory(id:string):Promise<Category>{
        const result = await this.categoryModel.findByIdAndDelete(id)
        if (!result) {
            throw new HttpException('系统异常，请联系管理员', HttpStatus.OK);
        }
        return result;
    }
}
