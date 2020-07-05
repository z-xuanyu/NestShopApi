import { ApiProperty } from '@nestjs/swagger';

export class PortalRegisterDto {
  @ApiProperty()
  phone: string;
  @ApiProperty()
  password: string;
}
