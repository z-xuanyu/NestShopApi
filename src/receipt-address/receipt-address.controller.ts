import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { ReceiptAddress } from '@libs/db/models/receiptAddress.model';
import { Crud } from 'nestjs-mongoose-crud';
import { AuthGuard } from '@nestjs/passport';

@Crud({
  model: ReceiptAddress,
  routes: {
    create: {
      decorators: [ApiOperation({ summary: '添加收货地址' })],
    },
    find: {
      decorators: [ApiOperation({ summary: '收货地址列表' })],
    },
    findOne: {
      decorators: [ApiOperation({ summary: '收货地址详细信息' })],
    },
    update: {
      decorators: [ApiOperation({ summary: '更新收货地址信息' })],
    },
    delete: {
      decorators: [ApiOperation({ summary: '删除收货地址' })],
    },
  },
})
@Controller('receiptAddress')
@ApiTags('后台会员收货地址')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class ReceiptAddressController {
  constructor(@InjectModel(ReceiptAddress) private readonly model) {}
}
