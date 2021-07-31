import { ApiPropertyOptional } from '@nestjs/swagger';

export class getUserListDto {
  @ApiPropertyOptional({ description: '名称' })
  name: string;
}
