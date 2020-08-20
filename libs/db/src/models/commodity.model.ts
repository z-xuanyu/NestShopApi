import { prop, Ref } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from './category.model';
import { Tag } from './tag.model';
import { Unit } from './unit.model';

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
  @prop({ default: false })
  isRecommend: boolean;

  @ApiProperty({ title: '新品' })
  @prop({ default: true })
  isNew: boolean;

  @ApiProperty({ title: '状态' })
  @prop({ default: 1 })
  status: number;

  @ApiProperty({ title: '描述' })
  @prop()
  desc: string;

  @ApiProperty({ title: '商品详情图片' })
  @prop()
  imgPathList: string[];

  @ApiProperty({ title: '商品轮播图' })
  @prop()
  bannerPathList: string[];
}
