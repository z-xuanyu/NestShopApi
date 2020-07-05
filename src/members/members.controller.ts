import { Controller, Get, UseGuards } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Member } from '@libs/db/models/member.model';
import { Crud } from 'nestjs-mongoose-crud';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { AuthGuard } from '@nestjs/passport';

@Crud({
  model: Member,
  routes: {
    find: false,
    create: {
      decorators: [ApiOperation({ summary: '添加会员' })],
    },
    findOne: {
      decorators: [ApiOperation({ summary: '查看会员信息' })],
    },
    update: {
      decorators: [ApiOperation({ summary: '更新会员信息' })],
    },
    delete: {
      decorators: [ApiOperation({ summary: '删除会员' })],
    },
  },
})
@Controller('members')
@ApiTags('后台会员管理')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class MembersController {
  constructor(
    @InjectModel(Member) private readonly model,
    @InjectModel(Member)
    private readonly memberModel: ReturnModelType<typeof Member>,
  ) {}

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @Get()
  @ApiOperation({ summary: '会员列表' })
  async getMemberList() {
    const result = await this.memberModel.find().populate('receiptAddress');
    return result;
  }
}
