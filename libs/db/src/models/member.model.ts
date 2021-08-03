/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2020-10-20 10:11:57
 * @LastEditTime: 2021-08-03 17:41:21
 * @Description: Modify here please
 */
import {
  prop,
  ModelOptions,
  DocumentType,
  Ref,
} from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { hashSync } from 'bcryptjs';
import { Commodity } from './commodity.model';
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


  @ApiProperty({title:"最新登录时间"})
  @prop()
  loginTime: Date

  @ApiProperty({title: '会员登录数次'})
  @prop({ default:0 })
  loginCount: number;

  @ApiProperty({ title:'消费金额' })
  @prop({ default: 0 })
  consumeMoney: number;

  @ApiProperty({ title:"消费数次" })
  @prop({ default: 0 })
  consumeCount: number;

  @ApiProperty({ title: '会员头像', example: "https://wxt.sinaimg.cn/large/007XivJ0gy1g93mawj6coj30qn0qnabt.jpg" })
  @prop()
  avatarImg: string;

  @ApiProperty({ title: '会员性别' })
  @prop({ required: true, default: 1})
  gender: number;

  @ApiProperty({ title: '会员邮箱' })
  @prop({ required: true })
  email: string;

  @ApiProperty({ title: '会员手机号码' })
  @prop({ required: true, unique: true })
  phone: string;

  @ApiProperty({ title: '会员收藏商品' })
  @prop({ ref:()=> Commodity })
  collectGoods:Ref<Commodity>[]

  
}
