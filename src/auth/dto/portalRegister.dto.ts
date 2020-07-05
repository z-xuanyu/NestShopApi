import { ApiProperty } from '@nestjs/swagger';

export class PortalRegisterDto {
  name: string;
  @ApiProperty()
  phone: string;
  @ApiProperty()
  password: string;
  avatarImg: string;
  gender: number;
  email: string;
  receiptAddress: [];
}
