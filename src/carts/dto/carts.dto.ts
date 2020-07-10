import { ApiProperty } from '@nestjs/swagger';

export class addCartDto {
  @ApiProperty({ title: '用户id',default:"string" })
  userID: any;

  @ApiProperty({ title: '商品id' })
  commodityID: any;

  quantity: number;
}

export class getCartInfoDto {
  @ApiProperty({ title: '用户id' })
  userID: string;
}
