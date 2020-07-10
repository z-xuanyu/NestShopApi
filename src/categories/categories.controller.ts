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
import { ReturnModelType } from '@typegoose/typegoose';

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
    @InjectModel(Category) private readonly model,
    @InjectModel(Category)
    private readonly categoryModel: ReturnModelType<typeof Category>,
  ) {}

  @ApiOperation({ summary: '分类列表' })
  @ApiResponse({ status: 401, description: '请填写token！' })
  @Get('list')
  async categoryList(@Query() categoryListDto: categoryListDto) {
    const { name, pageSize, pageNo } = categoryListDto;
    const totalCountData = await this.categoryModel.find(); //总条数
    // 名称查询
    if (name) {
      const data = await this.categoryModel
        .find({ name: { $regex: name } })
        .limit(Number(pageSize || 10))
        .skip(Number((pageNo - 1) * pageSize))
        .exec();
      return {
        pageNo: pageNo,
        pageSize: pageSize,
        data: data,
        totalCount: totalCountData.length,
        totalPage:
          totalCountData.length / pageSize < 1
            ? 1
            : totalCountData.length / pageSize,
      };
    } else {
      const data = await this.categoryModel
        .find()
        .limit(Number(pageSize || 10))
        .skip(Number((pageNo - 1) * pageSize))
        .exec();
      return {
        pageNo: pageNo,
        pageSize: pageSize,
        data: data,
        totalCount: totalCountData.length,
        totalPage:
          totalCountData.length / pageSize < 1
            ? 1
            : totalCountData.length / pageSize,
      };
    }
  }
}
