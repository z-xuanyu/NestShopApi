/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-08-02 17:30:19
 * @LastEditTime: 2021-08-11 09:57:26
 * @Description: Modify here please
 */
import { ApiProperty } from '@nestjs/swagger';

export class getRoleListDto {
  @ApiProperty({ title: '页数' })
  pageNumber: number;

  @ApiProperty({ title: '条数' })
  pageSize: number;
  
  @ApiProperty({ title: '名称' })
  name: string
}
