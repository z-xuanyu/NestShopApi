import { prop, ModelOptions, Ref } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from './category.model';
import { Tag } from './tag.model';

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
    localField: '_id',
    foreignField: 'Commodity',
  })
  categories: Ref<Category>[];

  @ApiProperty({ title: '折扣价' })
  @prop()
  discountPrice: number;

  @ApiProperty({ title: '定价' })
  @prop()
  price: number;

  @ApiProperty({ title: '标签' })
  @prop({
    ref: 'Tag',
    localField: '_id',
    foreignField: 'Commodity',
  })
  tags: Ref<Tag>[];

  @ApiProperty({ title: '推荐' })
  @prop()
  isRecommend: boolean;

  @ApiProperty({ title: '状态' })
  @prop()
  status: number;

  @ApiProperty({ title: '描述' })
  @prop()
  describe: string;

  @ApiProperty({ title: '商品图片' })
  @prop()
  imgPath: string[];
}
