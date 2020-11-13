import { prop, modelOptions, DocumentType } from '@typegoose/typegoose';
import { hashSync } from 'bcryptjs';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = DocumentType<User>;

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class User {
  @ApiProperty({ title: '用户名' })
  @prop({ required: true })
  username: string;

  @ApiProperty({ title: '头像' })
  @prop({ default: "https://wxt.sinaimg.cn/large/007XivJ0gy1g93mawj6coj30qn0qnabt.jpg" })
  avatar: string;

  @ApiProperty({ title: '邮箱' })
  @prop({ required: true, unique: true })
  email: string;

  @ApiProperty({ title: '状态', example: 1, description: '1：开启,2：关闭' })
  @prop({ default: 1 })
  status: number;

  @ApiProperty({ title: '密码' })
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

  @ApiProperty({ title: '超级管理员' })
  @prop({ default: false, required: true })
  isSuper: boolean;
}
