import { Controller, UseGuards, Get, Query } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Tag } from '@libs/db/models/tag.model';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import { Crud } from 'nestjs-mongoose-crud';
import { AuthGuard } from '@nestjs/passport';
import { ReturnModelType } from '@typegoose/typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';

// 标签列表Dto
class tagListDto {
  @ApiPropertyOptional({ title: '名称' })
  name: string;
  @ApiPropertyOptional({ title: '一页多少条', example: 10 })
  pageSize: number;
  @ApiPropertyOptional({ title: '当前页数', example: 1 })
  pageNo: number;
}
// 标签改变状态Dto
class tagChangeDto {
  @ApiPropertyOptional({ title: '标题ID' })
  tagID: string;

  @ApiPropertyOptional({ title: '状态' })
  status: boolean;
}

@Crud({
  model: Tag,
  routes: {
    create: {
      decorators: [ApiOperation({ summary: '添加标签' })],
    },
    find: false,
    findOne: {
      decorators: [ApiOperation({ summary: '标签信息' })],
    },
    update: {
      decorators: [ApiOperation({ summary: '更新标签' })],
    },
    delete: {
      decorators: [ApiOperation({ summary: '删除标签' })],
    },
  },
})
@Controller('tags')
@ApiTags('后台标签管理')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class TagsController {
  constructor(
    @InjectModel(Tag) private readonly model:ModelType<Tag>,
    @InjectModel(Tag) private readonly tagModel: ReturnModelType<typeof Tag>,
  ) {}

  @ApiOperation({ summary: '标签列表' })
  @Get('list')
  async tagList(@Query() tagList: tagListDto):Promise<any> {
    const { name, pageSize, pageNo } = tagList;
    const totalCountData = await this.tagModel.find(); //总条数
    // 名称查询
    if (name) {
      const data = await this.tagModel
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
      const data = await this.tagModel
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

  @ApiOperation({ summary: '改变状态' })
  @Get('changeStatus')
  async changeStatus(@Query() tagChange: tagChangeDto):Promise<any> {
    const { tagID, status } = tagChange;

    await this.tagModel.findByIdAndUpdate(tagID, { status: status });
    return {
      code: 20000,
      message: '成功'
    };
  }
}
