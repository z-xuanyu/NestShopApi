/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-08-02 17:30:19
 * @LastEditTime: 2021-08-11 10:00:02
 * @Description: Modify here please
 */
import { Role } from '@libs/db/models/role.model';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { TableResponseResult } from 'src/BaseResponseResult';
import { addRoleDto } from './dto/addRoleDto';
import { getRoleListDto } from './dto/getRoleListDto';
import { editRoleDto } from './dto/updateRoleDto';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role) private roleModel: ReturnModelType<typeof Role>,
  ) {}

  /**
   * 获取角色列表
   */
  async getRoleList(parameters: getRoleListDto):Promise<TableResponseResult<Role>>{
    const total = await this.roleModel.countDocuments();
    const result = await this.roleModel
      .find({ name: { $regex: new RegExp(parameters.name, 'i') } })
      .limit(~~parameters.pageSize)
      .skip(~~((parameters.pageNumber - 1) * parameters.pageSize))
      .exec();
    return {
      items: result,
      total,
    };
  }

  /**
   * 添加角色
   */
  async addRole(addRoleForm: addRoleDto): Promise<Role>{
    const result = await this.roleModel.create(addRoleForm as any);
    if (!result) {
      throw new HttpException('系统异常，请联系管理员', HttpStatus.OK);
    }
    return result;
  }

  /**
   * 获取角色详细信息
   */
  async getRoleInfo(id: string) :Promise<Role>{
    const result = await this.roleModel
      .findById({ _id: id })
      .populate('menuIds');

    return result;
  }

  /**
   * 更新角色信息
   */
  async updateRole(editRoleForm: editRoleDto, id: string) :Promise<Role>{
    const result = await this.roleModel.findByIdAndUpdate(
      id,
      editRoleForm as any,
    );
    if (!result) {
      throw new HttpException('系统异常，请联系管理员', HttpStatus.OK);
    }
    return result;
  }

  /**
   * 删除角色
   */
  async delRole(id: string) :Promise<Role>{
    const result = await this.roleModel.findByIdAndDelete(id);
    if (!result) {
      throw new HttpException('系统异常，请联系管理员', HttpStatus.OK);
    }
    return result;
  }
}
