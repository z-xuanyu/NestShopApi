import { Controller, UseGuards } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Tag } from '@libs/db/models/tag.model';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Crud } from 'nestjs-mongoose-crud';
import { AuthGuard } from '@nestjs/passport';

@Crud({
  model: Tag,
  routes: {
    create: {
      decorators: [ApiOperation({ summary: '添加标签' })],
    },
    find: {
      decorators: [ApiOperation({ summary: '标签列表' })],
    },
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
  constructor(@InjectModel(Tag) private readonly model) {}
}
