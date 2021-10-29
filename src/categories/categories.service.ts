/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-08-13 10:46:54
 * @LastEditTime: 2021-10-29 10:55:56
 * @Description: 商品分类业务服务模块
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

        // 列表转树
        const list2tree = (items, parentId = null) => {
            return items
                .filter(item => String(item.parentId) == String(parentId))
                .map(item => {
                    if (list2tree(items, String(item._id)).length) {
                        return {
                            _id: item._id,
                            name: item.name,
                            status: item.status,
                            createdAt: item.createdAt,
                            updatedAt: item.updatedAt,
                            pic: item.pic,
                            parentId: item.parentId,
                            sort: item.sort,
                            children: list2tree(items, String(item._id)),
                        };
                    } else {
                        return {
                            _id: item._id,
                            name: item.name,
                            status: item.status,
                            createdAt: item.createdAt,
                            updatedAt: item.updatedAt,
                            pic: item.pic,
                            parentId: item.parentId,
                            sort: item.sort,
                        };
                    }

                });
        };
        const total = await this.categoryModel.countDocuments();
        const result = await this.categoryModel
            .find({ name: { $regex: new RegExp(parameters.name, 'i') } })
            .limit(~~parameters.pageSize)
            .skip(~~((parameters.pageNumber - 1) * parameters.pageSize))
        return {
            items: list2tree(result),
            total
        };
    }


    // 添加商品分类
    async addCategory(parameters: AddGoodsCategory): Promise<Category> {
        const result = await this.categoryModel.create(parameters as any)
        if (!result) {
            throw new HttpException('系统异常，请联系管理员', HttpStatus.OK);
        }
        return result;
    }


    // 编辑更新商品分类
    async updateGoodsCategory(id: string, parameters: UpdateGoodsCategory): Promise<Category> {
        const result = await this.categoryModel.findByIdAndUpdate(id, parameters as any)
        if (!result) {
            throw new HttpException('系统异常，请联系管理员', HttpStatus.OK);
        }
        return result;
    }


    // 删除商品分类
    async delGoodsCategory(id: string): Promise<Category> {
        const result = await this.categoryModel.findByIdAndDelete(id)
        if (!result) {
            throw new HttpException('系统异常，请联系管理员', HttpStatus.OK);
        }
        return result;
    }
}
