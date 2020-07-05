import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ title: '用户名' })
  username: string;
  @ApiProperty({ title: '密码' })
  password: string;
}
