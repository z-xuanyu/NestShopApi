/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2020-10-20 10:11:57
 * @LastEditTime: 2021-08-12 14:27:42
 * @Description: Modify here please
 */
import { Controller, Get, UseGuards, Query, Post, Patch, Param, Delete, Body } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { MembersService } from './members.service';
import { GetMembersDto } from './dto/getMembers.dto';
import { BaseResponseResult, TableResponseResult } from 'src/BaseResponseResult';
import { Member } from '@libs/db/models/member.model';
import { AddMemberDto } from './dto/addMember.dto';
import { UpdateMemberDto } from './dto/updateMember.dto';

@Controller('members')
@ApiTags('后台会员管理')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class MembersController {
  constructor(private memberService:MembersService) { }

  @Get('')
  @ApiOperation({ summary: '会员列表' })
  async getMemberList(@Query() parameters: GetMembersDto): Promise<BaseResponseResult<TableResponseResult<Member>>> {
    const result = await this.memberService.getMembers(parameters)
    return {
      code: 1,
      result,
      message: '成功',
    };
  }


  @Post()
  @ApiOperation({ summary: '添加会员' })
  async addMember(@Body() parameters: AddMemberDto):Promise<BaseResponseResult<Member>>{
    const result = await this.memberService.addMember(parameters)
    return {
      code: 1,
      result,
      message: '成功',
    };
  }

  @Patch(":id")
  @ApiOperation({ summary: '编辑会员' })
  @ApiParam({ name: 'id', description: '会员id' })
  async updateMember(@Param("id") id: string,@Body() parameters: UpdateMemberDto):Promise<BaseResponseResult<Member>>{
    const result = await this.memberService.updateMember(id, parameters)
    return {
      code: 1,
      result,
      message: '成功',
    };
  }


  @Delete(":id")
  @ApiOperation({ summary: '删除会员' })
  @ApiParam({ name: 'id', description: '会员id' })
  async delMember(@Param("id") id: string):Promise<BaseResponseResult<Member>>{
    const result = await this.memberService.delMember(id)
    return {
      code: 1,
      result,
      message: '成功',
    };
  }
}
