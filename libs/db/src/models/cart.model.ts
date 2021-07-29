import { ApiProperty } from '@nestjs/swagger';
import { prop, ModelOptions, Ref } from '@typegoose/typegoose';
import { Commodity } from './commodity.model';
import { Member } from './member.model';

@ModelOptions({ schemaOptions: { timestamps: true } })
export class Cart {
  @ApiProperty({ title: '用户id' })
  @prop({ ref: 'Member' })
  userID: Ref<Member>;

  @ApiProperty({ title: '购物车商品列表' })
  @prop({ ref: 'Commodity' })
  commodityID: Ref<Commodity>;

  @prop({ default: 1 })
  quantity: number;
}
