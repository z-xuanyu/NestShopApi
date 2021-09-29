/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-08-02 17:30:19
 * @LastEditTime: 2021-09-10 11:12:37
 * @Description: Modify here please
 */
import { ApiProperty } from '@nestjs/swagger';

export class MenuParamDto {
  @ApiProperty({ title: '页数' })
  id: string;
}
