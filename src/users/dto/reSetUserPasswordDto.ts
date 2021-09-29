import { ApiProperty } from '@nestjs/swagger';

export class reSetUserPasswordDto {
  @ApiProperty({ title: '新密码' })
  password: string;
}
