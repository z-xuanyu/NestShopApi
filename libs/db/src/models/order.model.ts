import { ApiProperty } from '@nestjs/swagger';
import { prop, ModelOptions } from '@typegoose/typegoose';

@ModelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Order {
  @ApiProperty({ title: '订单编号' })
  @prop()
  orderNo: string;

  @ApiProperty({ title: '订单金额' })
  @prop()
  payMentTotal: number;

  @ApiProperty({
    title: '订单状态',
    description: '1:已支付 2:待支付 3:已完成 4:已取消',
  })
  @prop()
  status: number;
}
