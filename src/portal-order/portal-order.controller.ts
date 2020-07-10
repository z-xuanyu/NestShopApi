import { Controller } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { PortalOrder } from '@libs/db/models/portal.order.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { Crud } from 'nestjs-mongoose-crud';
import { ApiTags } from '@nestjs/swagger';

@Crud({
  model: PortalOrder,
})
@Controller('portal-order')
@ApiTags('客户端用户订单')
export class PortalOrderController {
  constructor(
    @InjectModel(PortalOrder)
    private readonly portalOrderModel: ReturnModelType<typeof PortalOrder>,
    @InjectModel(PortalOrder) private readonly model,
  ) {}
}
