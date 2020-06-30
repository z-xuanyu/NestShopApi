import { Controller, Get, Query, HttpCode } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '@libs/db/models/user.model';
import { Crud } from 'nestjs-mongoose-crud';
import { ApiTags, ApiOperation, ApiPropertyOptional } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
// eslint-disable-next-line @typescript-eslint/class-name-casing
class getAdminDto {
  @ApiPropertyOptional({ description: '名称' })
  name: string;
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
export class UsersController {
  constructor(
    @InjectModel(User) private readonly model,
    @InjectModel(User) private readonly UserModel: ReturnModelType<typeof User>,
  ) {}

  @Get()
  @ApiOperation({ summary: '管理员列表' })
  async getAdminList(@Query() paramData: getAdminDto) {
    if (paramData.name) {
      return await this.UserModel.find({
        username: { $regex: paramData.name },
      }).exec();
    } else {
      return await this.UserModel.find().exec();
    }
  }
}
