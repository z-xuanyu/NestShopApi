import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

export class commoditySearchKeywordDto {
  @ApiPropertyOptional({ title: '搜索关键词' })
  name: string;
  @ApiPropertyOptional({ title: '一页多少条', example: 10 })
  pageSize: number;
  @ApiPropertyOptional({ title: '当前页数', example: 1 })
  pageNo: number;
}

export class categoryCommodityDto {
  @ApiProperty({ title: '分类id' })
  categoryID: string;
  @ApiPropertyOptional({ title: '一页多少条', example: 10 })
  pageSize: number;
  @ApiPropertyOptional({ title: '当前页数', example: 1 })
  pageNo: number;
}

export class commodityInfoDto {
  @ApiProperty({ title: '商品id' })
  commodityID: string;
}
