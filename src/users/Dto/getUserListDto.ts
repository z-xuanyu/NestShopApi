/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-08-02 17:30:19
 * @LastEditTime: 2021-08-04 10:39:09
 * @Description: Modify here please
 */
import { ApiProperty } from '@nestjs/swagger';

export class getUserListDto {
  @ApiProperty({ title: '分页数量' })
  pageSize: number;


  @ApiProperty({ title: '页码' })
  pageNumber:number

  @ApiProperty({ description: '名称' })
  name: string;


  @ApiProperty({ title: '状态' })
  status: boolean
}
