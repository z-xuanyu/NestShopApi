/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2020-10-20 10:11:57
 * @LastEditTime: 2021-07-29 10:02:42
 * @Description: Modify here please
 */
import { modelOptions, prop, Ref } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from './category.model';
import { Tag } from './tag.model';
import { Unit } from './unit.model';

@modelOptions({
  schemaOptions:{
      timestamps:true
  }
})

export class Commodity {
  @ApiProperty({ title: '名称' })
  @prop()
  name: string;

  @ApiProperty({ title: '库存' })
  @prop()
  stock: number;

  @ApiProperty({ title: '类别' })
  @prop({
    ref: 'Category',
  })
  categories: Ref<Category>;
  @ApiProperty({ title: '折扣价' })
  @prop()
  discountPrice: number;

  @ApiProperty({ title: '定价' })
  @prop()
  price: number;

  @ApiProperty({ title: '标签' })
  @prop({
    ref: 'Tag',
  })
  tags: Ref<Tag>[];

  @ApiProperty({ title: '商品单位' })
  @prop({
    ref: 'Unit',
  })
  unit: Ref<Unit>;

  @ApiProperty({ title: '推荐' })
  @prop({ default: 2 })
  isRecommend:number;

  @ApiProperty({ title: '新品' })
  @prop({ default: 1 })
  isNewest: number;

  @ApiProperty({ title: '状态' })
  @prop({ default: 1 })
  status: number;

  @ApiProperty({ title: '描述' })
  @prop()
  desc: string;

  @ApiProperty({ title: '商品详情图片' })
  @prop()
  imgPathList: Array<string>;

  @ApiProperty({ title: '商品轮播图' })
  @prop()
  bannerPathList: Array<string>;
}
