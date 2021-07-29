/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2020-10-20 10:11:57
 * @LastEditTime: 2021-07-29 10:13:45
 * @Description: Modify here please
 */
import { ApiProperty } from '@nestjs/swagger';
import { prop, ModelOptions, Ref } from '@typegoose/typegoose';
import { Commodity } from './commodity.model';
import { ReceiptAddress } from './receiptAddress.model';

@ModelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Order {
  
  @ApiProperty({ title: '订单编号' })
  @prop()
  orderNo: string;

  @ApiProperty({ title: '收货地址id' })
  @prop({ ref:()=> ReceiptAddress })
  receiptAddressId: Ref<ReceiptAddress>


  @ApiProperty({ title: '商品id' })
  @prop({ ref:()=> Commodity })
  commodityId: Ref<ReceiptAddress>[]


  @ApiProperty({ title: '订单金额' })
  @prop()
  payMentTotal: number;

  @ApiProperty({
    title: '订单状态',
    description: '1:待付款 2:已支付 3:已完成 4:已取消',
  })
  @prop({ default: 1 })
  status: number;
}
