/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-08-10 16:27:31
 * @LastEditTime: 2021-09-03 11:44:31
 * @Description: Modify here please
 */
import { Member } from '@libs/db/models/member.model';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { mongoose, ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { TableResponseResult } from 'src/BaseResponseResult';
import { AddMemberDto } from './dto/addMember.dto';
import { GetMembersDto } from './dto/getMembers.dto';
import { UpdateMemberDto } from './dto/updateMember.dto';

@Injectable()
export class MembersService {
    constructor(@InjectModel(Member)
    private readonly memberModel: ReturnModelType<typeof Member>) { }


    // 获取会员列表
    async getMembers(parameters: GetMembersDto): Promise<TableResponseResult<Member>> {
        const total = await this.memberModel.countDocuments();
        const result = await this.memberModel.find({ name: { $regex: new RegExp(parameters.name, 'i') } }).limit(~~parameters.pageSize).skip(~~((parameters.pageNumber - 1) * parameters.pageSize))
        return {
            items: result,
            total
        };
    }

    // 添加会员
    async addMember(parameters: AddMemberDto): Promise<Member> {
        const result = await this.memberModel.create(parameters as Member)
        if (!result) {
            throw new HttpException('系统异常，请联系管理员', HttpStatus.OK);
        }
        return result;
    }


    // 编辑会员
    async updateMember(id: string, parameters: UpdateMemberDto): Promise<Member> {
        // 认证会员id是否正确
        const isObjectId = mongoose.Types.ObjectId.isValid(id)
        if (!isObjectId) {
            throw new HttpException('会员Id有误!', HttpStatus.OK);
        }
        const result = await this.memberModel.findByIdAndUpdate(id, parameters)
        if (!result) {
            throw new HttpException('系统异常，请联系管理员', HttpStatus.OK);
        }
        return result;
    }


    // 删除会员
    async delMember(id: string): Promise<Member> {
        // 认证会员id是否正确
        const isObjectId = mongoose.Types.ObjectId.isValid(id)
        if (!isObjectId) {
            throw new HttpException('会员Id有误!', HttpStatus.OK);
        }
        const result = await this.memberModel.findByIdAndDelete(id);
        if (!result) {
            throw new HttpException('系统异常，请联系管理员', HttpStatus.OK);
        }
        return result;
    }

    // 重置会员密码
    async resetMemberPassword(id: string, newPassword: string): Promise<Member> {
        // 认证会员id是否正确
        const isObjectId = mongoose.Types.ObjectId.isValid(id)
        if (!isObjectId) {
            throw new HttpException('会员Id有误!', HttpStatus.OK);
        }
        const result = await this.memberModel.findByIdAndUpdate(id, { password: newPassword })
        if (!result) {
            throw new HttpException('系统异常，请联系管理员', HttpStatus.OK);
        }
        return result;
    }
}
