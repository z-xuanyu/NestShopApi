/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-08-02 17:30:19
 * @LastEditTime: 2021-09-10 11:12:45
 * @Description: Modify here please
 */
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMenuDto {
  @ApiProperty({ title: '菜单名称' })
  name: string;

  @ApiProperty({ title: '父级菜单id(上级菜单)' })
  parentId?: string;

  @ApiProperty({ title: '菜单路径' })
  url: string;

  @ApiProperty({ title: '小图标' })
  icon: string;

  @ApiProperty({ title: '排序' })
  sort: number;

  @ApiProperty({ title: '组件keepAlive缓存' })
  keepAlive: number;

  @ApiProperty({ title: '是否隐藏菜单' })
  hideMenu: boolean
}
