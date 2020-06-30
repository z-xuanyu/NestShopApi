import { prop, ModelOptions } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';

@ModelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class ReceiptAddress {
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
