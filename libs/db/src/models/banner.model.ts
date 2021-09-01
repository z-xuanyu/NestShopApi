/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2020-10-20 10:11:57
 * @LastEditTime: 2021-09-01 14:56:14
 * @Description: Modify here please
 */
import { modelOptions, prop, Ref } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { Commodity } from './commodity.model';

@modelOptions({
  schemaOptions: {
    timestamps: true
  }
})

export class Banner {

  @ApiProperty({ title: 'banner名称' })
  @prop()
  name: string;

  @ApiProperty({ title: 'banner图片' })
  @prop()
  pic: string;

  @ApiProperty({ title: 'banner类型', default: 1, example: 1, description: "1：无跳转，2： 外链：3：关联商品" })
  @prop({ default: 1 })
  type: number

  @ApiProperty({ title: '外链url', default: 'https://www.zhouxuanyu.com', example: 'https://www.zhouxuanyu.com' })
  @prop({ default: 'https://www.zhouxuanyu.com' })
  targetUrl: string

  @ApiProperty({ title: "关联商品id" })
  @prop({ ref: ()=> Commodity })
  commodityId: Ref<Commodity>
}
