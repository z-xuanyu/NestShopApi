import { ApiProperty } from '@nestjs/swagger';

export class PortalLoginDto {
  @ApiProperty({ title: '手机号' })
  phone: string;
  @ApiProperty({ title: '密码' })
  password: string;
}
