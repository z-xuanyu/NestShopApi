import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { Unit } from '@libs/db/models/unit.model';
import { Crud } from 'nestjs-mongoose-crud';
import { ReturnModelType } from '@typegoose/typegoose';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class unitListDto {
  @ApiPropertyOptional({ title: '名称' })
  name: string;
  @ApiPropertyOptional({ title: '一页多少条', example: 10 })
  pageSize: number;
  @ApiPropertyOptional({ title: '当前页数', example: 1 })
  pageNo: number;
}

@Crud({
  model: Unit,
  routes: {
    create: {
      decorators: [ApiOperation({ summary: '添加单位名称' })],
    },
    find: false,
    findOne: {
      decorators: [ApiOperation({ summary: '单位名称信息' })],
    },
    update: {
      decorators: [ApiOperation({ summary: '更新单位名称' })],
    },
    delete: {
      decorators: [ApiOperation({ summary: '删除单位名称' })],
    },
  },
})
@Controller('unit')
@ApiTags('后台商品单位管理')
export class UnitController {
  constructor(
    @InjectModel(Unit) private readonly model,
    @InjectModel(Unit) private readonly unitModel: ReturnModelType<typeof Unit>,
  ) {}
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @ApiOperation({ summary: '单位名称列表' })
  @Get('list')
  async getUnitList(@Query() unitListDto: unitListDto) {
    const { name, pageSize, pageNo } = unitListDto;
    const totalCountData = await this.unitModel.find(); //总条数

    // 名称查询
    if (name) {
      const data = await this.unitModel
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
      const data = await this.unitModel
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
