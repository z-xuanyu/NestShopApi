import { ApiProperty } from '@nestjs/swagger';

export class addCartDto {
  @ApiProperty({ title: '用户id' })
  userID: string;

  @ApiProperty({ title: '商品id' })
  commodityID: string;
}
