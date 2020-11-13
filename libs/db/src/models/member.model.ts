import {
  prop,
  ModelOptions,
  DocumentType,
} from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { hashSync } from 'bcryptjs';
export type MemberDocument = DocumentType<Member>;
@ModelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Member {
  @ApiProperty({ title: '会员名称' })
  @prop({ required: true })
  name: string;

  @ApiProperty({ title: '会员密码' })
  @prop({
    select: false,
    required: true,
    get(val) {
      return val;
    },
    set(val) {
      return val ? hashSync(val) : val;
    },
  })
  password: string;

  @ApiProperty({ title: '会员头像', example: "https://wxt.sinaimg.cn/large/007XivJ0gy1g93mawj6coj30qn0qnabt.jpg" })
  @prop()
  avatarImg: string;

  @ApiProperty({ title: '会员性别' })
  @prop({ required: true })
  gender: number;

  @ApiProperty({ title: '会员邮箱' })
  @prop({ required: true })
  email: string;

  @ApiProperty({ title: '会员手机号码' })
  @prop({ required: true, unique: true })
  phone: string;
}
