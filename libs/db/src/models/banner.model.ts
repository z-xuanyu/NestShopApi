import { modelOptions, prop } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';

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
  url: string;

}
