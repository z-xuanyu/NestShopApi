import { ApiProperty } from '@nestjs/swagger';
import { prop, Ref, ModelOptions } from '@typegoose/typegoose';
import { Commodity } from './commodity.model';

@ModelOptions({ schemaOptions: { timestamps: true } })

export class Cart {
  @ApiProperty({ title: '用户id' })
  @prop()
  userID: string;

  @ApiProperty({ title: '购物车商品列表' })
  @prop({ ref: 'Commodity' })
  commodityID: Ref<Commodity>[];

  @prop({ default: 1 })
  quantity: number;
}
