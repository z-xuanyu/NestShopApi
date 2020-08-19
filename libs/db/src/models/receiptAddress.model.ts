import { prop, ModelOptions, Ref } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.model';

@ModelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class ReceiptAddress {
  // 地址关联会员
  @ApiProperty({ title: '会员id' })
  @prop({ ref: 'User' })
  userID: Ref<User>;

  @ApiProperty({ title: '姓名' })
  @prop()
  name: string;

  @ApiProperty({ title: '电话' })
  @prop()
  phone: string;

  @ApiProperty({ title: '地址' })
  @prop()
  address: string;

  @ApiProperty({ title: '邮编' })
  @prop()
  postalCode: string;

  @ApiProperty({ title: '默认' })
  @prop()
  isDefaule: boolean;
}
