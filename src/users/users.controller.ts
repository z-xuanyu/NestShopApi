import {
  Controller,
  Get,
  Query,
  UseGuards,
  Put,
  Body
} from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '@libs/db/models/user.model';
import { Crud } from 'nestjs-mongoose-crud';
import {
  ApiTags,
  ApiOperation,
  ApiPropertyOptional,
  ApiBearerAuth,
  ApiProperty,
} from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { AuthGuard } from '@nestjs/passport';

class getAdminDto {
  @ApiPropertyOptional({ description: '名称' })
  name: string;
}
class statusDto {
  @ApiProperty({ title: 'ID' })
  userID: string;
  @ApiProperty({
    title: '状态',
    description: '1:开启,2:禁用',
    example: 1,
  })
  status: number;
}

class reSetPasswordDto {
  @ApiProperty({ title: 'ID' })
  userID: string;
  @ApiProperty({ title: '新密码' })
  password: string;
}

@Crud({
  model: User,
  routes: {
    find: false,
    create: {
      decorators: [ApiOperation({ summary: '添加管理员' })],
    },
    findOne: {
      decorators: [ApiOperation({ summary: '查看管理员信息' })],
    },
    update: {
      decorators: [ApiOperation({ summary: '更新管理员信息' })],
    },
    delete: {
      decorators: [ApiOperation({ summary: '删除管理员' })],
    },
  },
})
@Controller('users')
@ApiTags('后台管理员')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class UsersController {
  constructor(
    @InjectModel(User) private readonly model,
    @InjectModel(User) private readonly UserModel: ReturnModelType<typeof User>,
  ) { }

  @Get()
  @ApiOperation({ summary: '管理员列表' })
  async getAdminList(@Query() paramData: getAdminDto): Promise<any> {
    if (paramData.name) {
      return await this.UserModel.find({
        username: { $regex: paramData.name },
      }).exec();
    } else {
      return await this.UserModel.find().exec();
    }
  }

  @Put('changeStatus')
  @ApiOperation({ summary: '改变管理员状态' })
  async changeUserStatus(@Body() status: statusDto): Promise<any> {
    const { userID } = status;
    const result = await this.UserModel.findByIdAndUpdate(userID, status);
    if (result) {
      return { code: 1, msg: 'succcess' };
    }
  }

  @Put('reSetPassword')
  @ApiOperation({ summary: '重置密码' })
  async reSetUserPassword(@Body() reSetPassword: reSetPasswordDto): Promise<any> {
    const { userID } = reSetPassword;
    const res = await this.UserModel.findByIdAndUpdate(
      userID,
      reSetPasswordDto,
    );
    if (res) return { code: 1, msg: 'succcess' };
  }


}
