/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2020-10-20 10:11:57
 * @LastEditTime: 2021-09-07 11:06:54
 * @Description: Modify here please
 */
import { prop, ModelOptions, Ref } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.model';

@ModelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class ReceiptAddress {
  
  @ApiProperty({ title: '会员id' })
  @prop({ ref: ()=> User })
  userId: Ref<User>;

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
  @prop({ default: false })
  isDefaule: boolean;
}
