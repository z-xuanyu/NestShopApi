import { prop, ModelOptions } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';

@ModelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Category {
  @ApiProperty({ title: '分类名称', example: '分类一' })
  @prop()
  name: string;

  @ApiProperty({
    title: '类别图片',
    example:
      'https://wxt.sinaimg.cn/large/007XivJ0gy1g93mawj6coj30qn0qnabt.jpg',
  })
  @prop()
  pic: string;

  @ApiProperty({ title: '类别排序', description: '整数数字类型' })
  @prop({ default: 1 })
  sort: number;
}
