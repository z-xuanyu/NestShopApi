import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ title: '邮箱' })
  email: string;
  @ApiProperty({ title: '密码' })
  password: string;
}
