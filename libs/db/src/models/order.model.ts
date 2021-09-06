/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2020-10-20 10:11:57
 * @LastEditTime: 2021-09-06 11:38:08
 * @Description: Modify here please
 */
import { ApiProperty } from '@nestjs/swagger';
import { prop, ModelOptions, Ref } from '@typegoose/typegoose';
import { Commodity } from './commodity.model';
import { Member } from './member.model';
import { ReceiptAddress } from './receiptAddress.model';

@ModelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
class CommodityType {
  commodityId: Ref<Commodity>;
  commodityNum: number;

}
export class Order {

  @ApiProperty({ title: '会员id' })
  @prop({ ref:()=> Member })
  memberId: Ref<Member>


  @ApiProperty({ title: '收货地址id' })
  @prop({ ref: () => ReceiptAddress })
  receiptAddressId: Ref<ReceiptAddress>


  @ApiProperty({ title: '商品' })
  @prop({ ref: () => Commodity })
  commodityList: Array<CommodityType>;

  @ApiProperty({ title: '支付方式', description: '1: 余额支付，2: 微信支付，3: 支付宝' })
  @prop({ default: 1 })
  paymentType: number;


  @ApiProperty({
    title: '订单状态',
    description: '1:待付款 2:已支付 3:已完成 4:已取消',
  })
  @prop({ default: 1 })
  status: number;
}
