import { prop, Ref } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { Commodity } from './commodity.model';
export class Banner {
  @ApiProperty({ title: 'banner图片' })
  @prop()
  bannerPath: string;

  @ApiProperty({
    title: '类型',
    example: 1,
    description: '1:纯图片,2:关联商品,3:外部链接',
  })
  @prop({ default: 1 })
  bannerType: number;

  @ApiProperty({ title: '外部链接' })
  @prop()
  targetUrl: string;

  @ApiProperty({ title: '商品id' })
  @prop({ ref: Commodity })
  commodityID: Ref<Commodity>;
}
