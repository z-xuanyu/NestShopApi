/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-08-02 17:30:19
 * @LastEditTime: 2021-08-04 10:39:09
 * @Description: Modify here please
 */
import { ApiPropertyOptional } from '@nestjs/swagger';

export class getUserListDto {
  @ApiPropertyOptional({ description: '名称' })
  name: string;
}
