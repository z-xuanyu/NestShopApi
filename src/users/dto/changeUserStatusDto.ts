import { ApiProperty } from '@nestjs/swagger';

export class changeUserStatusDto {
  @ApiProperty({
    title: '状态',
    description: 'true:开启,false:禁用',
    example: true,
  })
  status: boolean;
}
