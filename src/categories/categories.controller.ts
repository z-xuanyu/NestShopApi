/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2020-10-20 10:11:57
 * @LastEditTime: 2021-07-28 11:26:53
 * @Description: Modify here please
 */
import { Controller, UseGuards, Query, Get } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Category } from '@libs/db/models/category.model';
import { Crud } from 'nestjs-mongoose-crud';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiPropertyOptional,
  ApiResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ReturnModelType } from '@typegoose/typegoose'
import { ModelType } from '@typegoose/typegoose/lib/types';

class categoryListDto {
  @ApiPropertyOptional({ title: '名称' })
  name: string;
  @ApiPropertyOptional({ title: '一页多少条', example: 10 })
  pageSize: number;
  @ApiPropertyOptional({ title: '当前页数', example: 1 })
  pageNo: number;
}
@Crud({
  model: Category,
  routes: {
    find: false,
    create: {
      decorators: [ApiOperation({ summary: '添加分类' })],
    },
    findOne: {
      decorators: [ApiOperation({ summary: '查看分类信息' })],
    },
    update: {
      decorators: [ApiOperation({ summary: '更新分类信息' })],
    },
    delete: {
      decorators: [ApiOperation({ summary: '删除分类' })],
    },
  },
})
@Controller('categories')
@ApiTags('后台类别')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class CategoriesController {
  constructor(
    @InjectModel(Category) private readonly model:ModelType<Category>,
    @InjectModel(Category)
    private readonly categoryModel: ReturnModelType<typeof Category>
  ) { }

  @ApiOperation({ summary: '分类列表' })
  @ApiResponse({ status: 401, description: '请填写token！' })
  @Get('list')
  async categoryList(@Query() categoryList: categoryListDto): Promise<any> {

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

    const { name, pageSize, pageNo } = categoryList;
    const totalCountData = await this.categoryModel.find(); //总条数
    // 名称查询
    const data = await this.categoryModel
        .find(name? { name: { $regex: name }}: {})
        .limit(Number(pageSize || 10))
        .skip(Number((pageNo - 1) * pageSize))
        .exec();
      return {
        pageNo: pageNo,
        pageSize: pageSize,
        data: list2tree(data),
        totalCount: totalCountData.length,
        totalPage:
          totalCountData.length / pageSize < 1
            ? 1
            : totalCountData.length / pageSize,
      };
  }
}

