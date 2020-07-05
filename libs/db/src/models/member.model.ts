import {
  prop,
  ModelOptions,
  Ref,
  arrayProp,
  DocumentType,
} from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { ReceiptAddress } from './receiptAddress.model';
import { hashSync } from 'bcryptjs';
export type MemberDocument = DocumentType<Member>;
@ModelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Member {
  @ApiProperty({ title: '会员名称' })
  @prop()
  name: string;

  @ApiProperty({ title: '会员密码' })
  @prop({
    select: false,
    get(val) {
      return val;
    },
    set(val) {
      return val ? hashSync(val) : val;
    },
  })
  password: string;

  @ApiProperty({ title: '会员头像' })
  @prop()
  avatarImg: string;

  @ApiProperty({ title: '会员性别' })
  @prop()
  gender: number;

  @ApiProperty({ title: '会员邮箱' })
  @prop()
  email: string;

  @ApiProperty({ title: '会员手机号码' })
  @prop()
  phone: string;

  @ApiProperty({ title: '会员收货地址' })
  @arrayProp({
    ref: 'ReceiptAddress',
  })
  receiptAddress: Ref<ReceiptAddress>[];
}
