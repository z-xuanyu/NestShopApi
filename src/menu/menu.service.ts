/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-08-02 17:30:19
 * @LastEditTime: 2021-09-10 15:50:53
 * @Description: Modify here please
 */
import { Menu } from '@libs/db/models/menu.model';
import { Role } from '@libs/db/models/role.model';
import { User } from '@libs/db/models/user.model';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { AddMenuDto } from './Dto/addMenuDto';
import { UpdateMenuDto } from './Dto/updateMenuDto';

@Injectable()
export class MenuService {
  constructor(
    @InjectModel(Menu) private menuModel: ReturnModelType<typeof Menu>,
    @InjectModel(User) private adminModel: ReturnModelType<typeof User>,
    @InjectModel(Role) private roleModel: ReturnModelType<typeof Role>,
  ) { }

  /**
   * 通过管理员关联的角色获取权限菜单
   */
  async getMenuListByRoleAndAdmin(id: string): Promise<any> {
    // 获取所有菜单
    const allMenuList =  await this.menuModel.find();
    // 通过admin查询该管理员的角色
    const roles = await this.adminModel
      .findById({ _id: id })
      .populate('roleIds');
    // 获取角色的菜单
    let menus: any = [];
    for (const key in roles.roleIds) {
      const rolesItem: any = roles.roleIds[key];
      const menuListRes = await this.roleModel
        .findById({
          _id: rolesItem._id,
        })
        .populate('menuIds');

      menus = menus.concat(menuListRes.menuIds);
    }
    // 筛选菜单
    menus.forEach(item => {
      if(item.parentId !== null){
        const parent = allMenuList.find(i=> String(i._id) == String(item.parentId))
        if(parent) {
          menus.push(parent)
        }
      }
    })
    // 菜单去重
    const MenuObj = {};
    const allMenus = menus.reduce((cur: any, next: any) => {
      MenuObj[next._id] ? '' : (MenuObj[next._id] = true && cur.push(next));
      return cur;
    }, []);
    return allMenus.sort((a: any, b: any) => {
      return b.sort - a.sort;
    });
  }

  /**
   * 获取菜单列表
   */
  async getMenuList(): Promise<Array<Menu>> {
    return await this.menuModel.find();
  }

  /**
   * 添加菜单
   */
  async addMenu(addMenuForm: AddMenuDto): Promise<Menu> {
    const result = await this.menuModel.create(addMenuForm as any);
    if (!result) {
      throw new HttpException('系统异常，请联系管理员', HttpStatus.OK);
    }
    return result;
  }

  /**
   * 更新菜单信息
   */
  async updateMenu(updateMenuForm: UpdateMenuDto, id: string): Promise<Menu> {
    const result = await this.menuModel.findByIdAndUpdate(
      id,
      updateMenuForm as any,
    );
    if (!result) {
      throw new HttpException('系统异常，请联系管理员', HttpStatus.OK);
    }
    return result;
  }

  /**
   * 删除菜单
   */
  async delMenu(id: string): Promise<Menu> {
    const result = await this.menuModel.findByIdAndDelete({ _id: id });
    if (!result) {
      throw new HttpException('系统异常，请联系管理员', HttpStatus.OK);
    }
    return result;
  }
}
