import { User } from '@libs/db/models/user.model';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { addUserDto } from './Dto/addUserDto';
import { changeUserStatusDto } from './Dto/changeUserStatusDto';
import { editUserDto } from './Dto/editUserDto';
import { getUserListDto } from './Dto/getUserListDto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userModel: ReturnModelType<typeof User>,
  ) {}

  /**
   * 获取管理员列表
   */
  async getUsers(param: getUserListDto) {
    const result = await this.userModel
      .find(
        param.name
          ? {
              name: { $regex: param.name },
            }
          : {},
      )
      .populate('roleIds')
      .exec();
    return result;
  }

  /** 
   * 添加用户
   */
  async createUser(addUserForm: addUserDto) {
    const isHasEmail = await this.userModel.findOne({
      email: addUserForm.email,
    });
    if (isHasEmail) {
      throw new HttpException('邮箱已经存在！', HttpStatus.OK);
    }
    const result = await this.userModel.create(addUserForm as any);
    if (!result) {
      throw new HttpException('系统异常，请联系管理员', HttpStatus.OK);
    }

    return result;
  }

  /**
   * 更新管理员信息
   */

  async updateUser(editUserForm: editUserDto, id: string) {
    const isHasEmail = await this.userModel.findOne({
      email: editUserForm.email,
    });
    if (isHasEmail._id != id) {
      throw new HttpException('邮箱已经存在！', HttpStatus.OK);
    }

    const result = await this.userModel.findByIdAndUpdate(
      id,
      editUserForm as any,
    );

    if (!result) {
      throw new HttpException('系统异常，请联系管理员', HttpStatus.OK);
    }

    return result;
  }

  /**
   * 改变管理员状态
   */
  async changeUserStatus(userID: string, status: changeUserStatusDto) {
    const result = await this.userModel.findByIdAndUpdate(userID, status);
    if (!result) {
      throw new HttpException('系统异常，请联系管理员', HttpStatus.OK);
    }

    return result;
  }

  /**
   * 重置会员密码
   */
  async reSetUserPassword(userId: string, newPassword: string) {
    const result = await this.userModel.findByIdAndUpdate(userId, {
      password: newPassword,
    });
    if (!result) {
      throw new HttpException('系统异常，请联系管理员', HttpStatus.OK);
    }
    return result;
  }

  /**
   * 删除账号
   */
  async delUser(userId: string) {
    const userInfo = await this.userModel.findById(userId);
    if (userInfo.isSuper) {
      throw new HttpException('此账号为超级账号，不能删除', HttpStatus.OK);
    }
    return await this.userModel.findByIdAndDelete(userId);
  }
}
