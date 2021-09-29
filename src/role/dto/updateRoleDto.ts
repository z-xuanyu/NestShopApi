/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-08-02 17:30:19
 * @LastEditTime: 2021-08-10 16:34:54
 * @Description: Modify here please
 */
import { ApiProperty } from '@nestjs/swagger';

export class editRoleDto {
  @ApiProperty({ title: '角色名称' })
  name: string;

  @ApiProperty({ title: '角色描述' })
  description: string;

  @ApiProperty({ title: '角色权限菜单' })
  menuIds?: Array<string>;
}
