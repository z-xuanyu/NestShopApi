import { prop, ModelOptions } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';

@ModelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Tag {
  @ApiProperty({ title: '标签名', example: '标签一' })
  @prop()
  name: string;
}
