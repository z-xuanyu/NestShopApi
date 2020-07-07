import { prop, ModelOptions } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';

@ModelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Unit {
  @ApiProperty({title:"名称"})
  @prop()
  name: string;
}
