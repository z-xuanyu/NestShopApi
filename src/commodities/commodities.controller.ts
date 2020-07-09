import { Controller, UseGuards } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Commodity } from '@libs/db/models/commodity.model';
import { Crud } from 'nestjs-mongoose-crud';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Crud({
  model: Commodity,
  routes: {
    create: {
      decorators: [ApiOperation({ summary: '添加商品' })],
    },
    find: {
      decorators: [ApiOperation({ summary: '商品列表' })],
      populate: ['categories', 'tags'],
    },
    findOne: {
      decorators: [ApiOperation({ summary: '商品详细信息' })],
    },
    update: {
      decorators: [ApiOperation({ summary: '更新商品信息' })],
    },
    delete: {
      decorators: [ApiOperation({ summary: '删除商品' })],
    },
  },
})
@Controller('commodities')
@ApiTags('后台商品管理')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class CommoditiesController {
  constructor(@InjectModel(Commodity) private readonly model,) {}
}
