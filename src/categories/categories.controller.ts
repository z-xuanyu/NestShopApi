/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2020-10-20 10:11:57
 * @LastEditTime: 2021-08-13 11:32:37
 * @Description: Modify here please
 */
import { Controller, UseGuards, Query, Get, Body, Post, Patch, Param, Delete } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CategoriesService } from './categories.service';
import { GetGoodsCategoriesDto } from './dto/getCategories.dto';
import { BaseResponseResult, TableResponseResult } from 'src/BaseResponseResult';
import { Category } from '@libs/db/models/category.model';
import { AddGoodsCategory } from './dto/addCategory.dto';
import { UpdateGoodsCategory } from './dto/updateCategory.dto';


@Controller('categories')
@ApiTags('后台商品分类')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class CategoriesController {
  constructor(private categoryService: CategoriesService) { }



  @Get()
  @ApiOperation({ summary: '分类列表' })
  async categoryList(@Query() parameters: GetGoodsCategoriesDto): Promise<BaseResponseResult<TableResponseResult<Category>>> {
    // 列表转树
    const list2tree = (items, parentId = 'null') => {
      return items
        .filter(item => String(item.parentId) == String(parentId))
        .map(item => {
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
        });
    };
    const info = await this.categoryService.getGoodsCategory(parameters)
    const result = list2tree(info)
    return {
      code: 1,
      result,
      message: '成功',
    };
  }


  @Post()
  @ApiOperation({ summary: '添加商品分类' })
  async addGoodsCategory(@Body() parameters:AddGoodsCategory):Promise<BaseResponseResult<Category>>{
    const result = await this.categoryService.addCategory(parameters)
    return {
      code: 1,
      result,
      message:'成功'
    }
  }


  @Patch(":id")
  @ApiOperation({ summary: '编辑更新商品分类信息' })
  @ApiParam({ name:'id', description: '商品分类id' })
  async updateGoodsCategory(@Param('id') id:string,@Body() parameters: UpdateGoodsCategory):Promise<BaseResponseResult<Category>>{
    const result = await this.categoryService.updateGoodsCategory(id,parameters)
    return {
      code: 1,
      result,
      message:'成功'
    }
  }


  @Delete()
  @ApiOperation({ summary: '删除商品分类' })
  @ApiParam({ name:'id', description: '商品分类id' })
  async delGoodsCategory(@Param('id') id:string):Promise<BaseResponseResult<Category>>{
    const result = await this.categoryService.delGoodsCategory(id)
    return {
      code: 1,
      result,
      message:'成功'
    }
  }
}

