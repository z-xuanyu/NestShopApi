import { Controller } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Category } from '@libs/db/models/category.model';
import { Crud } from 'nestjs-mongoose-crud';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@Crud({
  model: Category,
  routes: {
    find: {
      decorators: [ApiOperation({ summary: '分类列表' })]
    },
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
export class CategoriesController {
  constructor(@InjectModel(Category) private readonly model) {}
}
