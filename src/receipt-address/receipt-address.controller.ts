import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { ReceiptAddress } from '@libs/db/models/receiptAddress.model';
import { Crud } from 'nestjs-mongoose-crud';

@Crud({
  model: ReceiptAddress,
})
@Controller('receiptAddress')
@ApiTags('后台会员收货地址')
export class ReceiptAddressController {
  constructor(@InjectModel(ReceiptAddress) private readonly model) {}
}
