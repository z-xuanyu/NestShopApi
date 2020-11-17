import { Controller, Get, UseGuards, Put, Body, Query } from '@nestjs/common';
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
import { ReturnModelType } from '@typegoose/typegoose';
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
  ) { }

  @Get('list')
  @ApiOperation({ summary: '会员列表' })
  async getMemberList(@Query() getMemberList: getMemberListDto): Promise<any> {
    const { name, pageSize, pageNo } = getMemberList;
    const totalCountData = await this.memberModel.find(); //总条数

    // 名称查询
    if (name) {
      const data = await this.memberModel
        .find({ name: { $regex: name } })
        .populate('receiptAddress')
        .limit(Number(pageSize || 10))
        .skip(Number((pageNo - 1) * pageSize))
        .exec();
      return {
        pageNo: pageNo,
        pageSize: pageSize,
        data: data,
        totalCount: totalCountData.length,
        totalPage:
          totalCountData.length / pageSize < 1
            ? 1
            : totalCountData.length / pageSize,
      };
    } else {
      const data = await this.memberModel
        .find()
        .populate('receiptAddress')
        .limit(Number(pageSize || 10))
        .skip(Number((pageNo - 1) * pageSize))
        .exec();
      return {
        pageNo: pageNo,
        pageSize: pageSize,
        data: data,
        totalCount: totalCountData.length,
        totalPage:
          totalCountData.length / pageSize < 1
            ? 1
            : totalCountData.length / pageSize,
      };
    }
  }

  @Put('resetMemberPassword')
  @ApiOperation({ summary: '重新会员密码' })
  async resetMemberPassword(
    @Body() resetMemberPassword: resetMemberPasswordDto,
  ): Promise<any> {
    const { memberID, password } = resetMemberPassword;
    const res = await this.memberModel.findByIdAndUpdate(memberID, {
      password: password,
    });
    if (res) return { code: 20000, msg: 'success' };
  }
}
