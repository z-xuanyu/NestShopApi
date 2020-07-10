import { ApiProperty } from '@nestjs/swagger';
import { prop, Ref } from '@typegoose/typegoose';
import { ReceiptAddress } from './receiptAddress.model';
import { Cart } from './protal.cart.model';

export class PortalOrder {
  @ApiProperty({ title: '收货地址id' })
  @prop({ ref: ReceiptAddress })
  receiptAddressID: Ref<ReceiptAddress>;

  @ApiProperty({ title: '购物车商品id' })
  @prop({ ref: Cart })
  cartCommodityID: Ref<Cart>;

  // 订单状态 1:未支付 2:已支付
  @prop({ default: 1 })
  status: number;
}
