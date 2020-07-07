import { Controller } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { Unit } from '@libs/db/models/unit.model';
import { Crud } from 'nestjs-mongoose-crud';

@Crud({
  model: Unit,
  routes: {
    create: {
      decorators: [ApiOperation({ summary: '添加单位名称' })],
    },
    find: {
      decorators: [ApiOperation({ summary: '单位名称列表' })],
    },
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
  constructor(@InjectModel(Unit) private readonly model) {}
}
