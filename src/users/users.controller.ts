import {
  Controller,
  Get,
  Query,
  UseGuards,
  Put,
  Body,
  Delete,
  Param,
  Post,
  Patch
} from '@nestjs/common';
import { User, UserDocument } from '@libs/db/models/user.model';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { getUserListDto } from './dto/getUserListDto';
import { changeUserStatusDto } from './dto/changeUserStatusDto';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { reSetUserPasswordDto } from './dto/reSetUserPasswordDto';
import { addUserDto } from './dto/addUserDto';
import { editUserDto } from './dto/editUserDto';
import { BaseResponseResult, TableResponseResult } from 'src/BaseResponseResult';
import { ParseIdPipe } from '@app/common/pipe/parse.id.pipe';

@Controller('users')
@ApiTags('后台用户')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class UsersController {
  constructor(private userService: UsersService) {}

  /**
   * 获取管理员列表
   */
  @Get()
  @ApiOperation({ summary: '用户列表' })
  async getAdminList(
    @Query() param: getUserListDto,
  ): Promise<BaseResponseResult<TableResponseResult<User>>> {
    const result = await this.userService.getUsers(param);
    return {
      code: 1,
      result,
      message: '成功',
    };
  }

  /**
   * 添加管理员
   */
  @Post()
  @ApiOperation({ summary: '添加用户' })
  async addAdmin(
    @Body() addUserForm: addUserDto,
  ): Promise<BaseResponseResult<User>> {
    const result = await this.userService.createUser(addUserForm);
    return {
      code: 1,
      message: '请求成功',
      result,
    };
  }

  /**
   * 更新管理员信息
   */
  @Patch(':id')
  @ApiOperation({ summary: '编辑用户' })
  @ApiParam({ name: 'id', description: '用户id' })
  async updateAdmin(
    @Body() editUserForm: editUserDto,
    @Param('id', new ParseIdPipe()) id: string,
  ): Promise<BaseResponseResult<User>> {
    const result = await this.userService.updateUser(editUserForm, id);
    return {
      code: 1,
      message: '请求成功',
      result,
    };
  }

  // 改变管理员状态
  @Put('changeStatus')
  @ApiOperation({ summary: '改变用户状态' })
  async changeUserStatus(
    @Body() param: changeUserStatusDto,
    @CurrentUser() user: UserDocument,
  ): Promise<BaseResponseResult<User>> {
    const result = await this.userService.changeUserStatus(user._id, param);
    return {
      code: 1,
      result,
      message: '成功',
    };
  }

  /**
   * 重置密码
   */
  @Put('reSetPassword')
  @ApiOperation({ summary: '重置密码' })
  async reSetUserPassword(
    @Body() reSetPassword: reSetUserPasswordDto,
    @CurrentUser() user: UserDocument,
  ): Promise<BaseResponseResult<any>> {
    const result = await this.reSetUserPassword(
      user._id,
      reSetPassword.password as any,
    );
    return {
      code: 1,
      result,
      message: '成功',
    };
  }

  /**
   * 删除管理员
   */
  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: '管理员id',
  })
  @ApiOperation({ summary: '删除管理员' })
  async delAdmin(@Param('id', new ParseIdPipe()) id: string): Promise<BaseResponseResult<User>> {
    const result = await this.userService.delUser(id);
    return {
      code: 1,
      message: '请求成功',
      result,
    };
  }
}
