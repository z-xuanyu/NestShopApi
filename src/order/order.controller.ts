import { Controller } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Order } from '@libs/db/models/order.model';
import { Crud } from 'nestjs-mongoose-crud';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ModelType } from '@typegoose/typegoose/lib/types';
@Crud({
  model: Order,
  routes: {
    find: {
      decorators: [ApiOperation({ summary: '订单列表' })],
    },
    create: false,
    delete: false,
    update: false,
    findOne: { decorators: [ApiOperation({ summary: '订单详情' })] },
  },
})
@Controller('order')
@ApiTags('后台订单管理')
export class OrderController {
  constructor(@InjectModel(Order) private readonly model:ModelType<Order>) {}
}
