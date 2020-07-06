import {
  Controller,
  Get,
  UseGuards,
  Put,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Member } from '@libs/db/models/member.model';
import { Crud } from 'nestjs-mongoose-crud';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import { ReturnModelType, prop } from '@typegoose/typegoose';
import { AuthGuard } from '@nestjs/passport';

class resetMemberPasswordDto {
  @ApiProperty({ title: '会员ID' })
  memberID: string;
  @ApiProperty({ title: '会员新密码' })
  password: string;
}

class getMemberListDto {
  @ApiPropertyOptional({ title: '名称' })
  name: string;
  @ApiPropertyOptional({ title: '一页多少条', example: 10 })
  pageSize: number;
  @ApiPropertyOptional({ title: '当前页数', example: 1 })
  pageNo: number;
}

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

  @Get()
  @ApiOperation({ summary: '会员列表' })
  async getMemberList(@Param() getMemberListDto: getMemberListDto) {
    const { name, pageSize, pageNo } = getMemberListDto;
    if (name) {
      const data = await this.memberModel
        .find({ name: { $regex: name } })
        .populate('receiptAddress')
        .limit(pageSize || 10)
        .skip((pageNo - 1) * pageSize)
        .exec();
      return {
        pageNo: pageNo,
        pageSize: pageSize,
        data: data,
        totalCount: data.length,
        totalPage: data.length / pageSize,
      };
    } else {
      const data = await this.memberModel
        .find()
        .populate('receiptAddress')
        .limit(pageSize || 10)
        .skip((pageNo - 1) * pageSize)
        .exec();
      return {
        pageNo: pageNo,
        pageSize: pageSize,
        data: data,
        totalCount: data.length,
        totalPage: data.length / pageSize,
      };
    }
  }

  @Put('resetMemberPassword')
  @ApiOperation({ summary: '重新会员密码' })
  async resetMemberPassword(
    @Body() resetMemberPasswordDto: resetMemberPasswordDto,
  ) {
    const { memberID, password } = resetMemberPasswordDto;
    const res = await this.memberModel.findByIdAndUpdate(memberID, {
      password: password,
    });
    if (res) return { code: 1, msg: 'success' };
  }
}
