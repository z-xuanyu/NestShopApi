import { Controller } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Banner } from '@libs/db/models/banner.model';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Crud } from 'nestjs-mongoose-crud';
@Crud({
  model: Banner,
  routes: {
    create: {
      decorators: [ApiOperation({ summary: '添加banner' })],
    },
    find: {
      decorators: [ApiOperation({ summary: 'banner列表' })],
    },
    findOne: {
      decorators: [ApiOperation({ summary: 'banner信息' })],
    },
    update: {
      decorators: [ApiOperation({ summary: '更新banner' })],
    },
    delete: {
      decorators: [ApiOperation({ summary: '删除banner' })],
    },
  },
})
@Controller('banner')
@ApiTags('后台banner管理')
export class BannerController {
  constructor(@InjectModel(Banner) private readonly model) {}
}
