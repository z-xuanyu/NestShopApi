/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2020-10-20 10:11:57
 * @LastEditTime: 2021-07-29 10:04:10
 * @Description: Modify here please
 */
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
  @prop({ required: true, default: 1, example: 1, description: '1:男 ，2：女' })
  gender: number;

  @ApiProperty({ title: '会员邮箱' })
  @prop({ required: true })
  email: string;

  @ApiProperty({ title: '会员手机号码' })
  @prop({ required: true, unique: true })
  phone: string;
}
