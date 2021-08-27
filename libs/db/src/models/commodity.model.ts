/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2020-10-20 10:11:57
 * @LastEditTime: 2021-08-27 16:17:21
 * @Description: Modify here please
 */
import { modelOptions, prop, Ref } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from './category.model';
import { Tag } from './tag.model';

@modelOptions({
  schemaOptions: {
    timestamps: true
  }
})

export class Commodity {
  @ApiProperty({ title: '标题' })
  @prop()
  name: string;

  @ApiProperty({ title: '副标题' })
  @prop()
  subTitle: string


  @ApiProperty({ title: '库存' })
  @prop()
  stock: number;

  @ApiProperty({ title: '类别' })
  @prop({
    ref: () => Category,
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
  tags?: Ref<Tag>[];

  @ApiProperty({ title: '商品单位' })
  @prop()
  unit: string;

  @ApiProperty({ title: '热门推荐', description: 'true：新品' })
  @prop({ default: true })
  isRecommend: boolean;

  @ApiProperty({ title: '新品', description: 'true：新品' })
  @prop({ default: true })
  isNewest: boolean;

  @ApiProperty({ title: '状态', description: 'true：上架，false:下架' })
  @prop({ default: true })
  status: boolean;

  @ApiProperty({ title: '描述' })
  @prop()
  desc: string;


  @ApiProperty({ title: '商品主图' })
  @prop()
  coverImg: string

  @ApiProperty({ title: '商品详情图片' })
  @prop()
  imgPathList?: [];

  @ApiProperty({ title: '商品轮播图' })
  @prop({
    get(val) {
      console.log(val, '商品模型')
      return val;
    },
    set(val) {
      return val;
    },
  })
  bannerPathList: string[];

  @ApiProperty({ title: "商品销量" })
  @prop({ default: 0 })
  sales?: number;

  @ApiProperty({ title: '商品浏览量' })
  @prop({ default: 0 })
  views?: number;
}
