/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2020-10-20 10:11:57
 * @LastEditTime: 2021-07-28 10:40:15
 * @Description: Modify here please
 */
import { prop, ModelOptions } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';

@ModelOptions({
  schemaOptions: {
    timestamps: true,
    toJSON: {
      virtuals: true, versionKey: false
    },
    toObject: { virtuals: true }
  },
})
export class Category {
  @ApiProperty({ title: '分类名称', example: '手机' })
  @prop({ required: true })
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

  @ApiProperty({ title: '分类状态', example: true })
  @prop({ default: true })
  status: boolean

  @ApiProperty({ title: '上级分类' , default: 'null'})
  @prop()
  parentId: string
}
