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
  @ApiProperty({ title: '用户名', example: 'admin' })
  @prop()
  username: string;

  @ApiProperty({ title: '密码', example: '123456' })
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

  @ApiProperty({ title: '超级管理员' })
  @prop()
  isSuper: boolean;
}
