/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-08-10 16:27:31
 * @LastEditTime: 2021-10-29 11:05:15
 * @Description: Modify here please
 */
import { Member } from '@libs/db/models/member.model';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
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
        const isHasPhone = await this.memberModel.findOne({ phone: parameters.phone });
        const isHasEmail = await this.memberModel.findOne({ email: parameters.email });
        if(isHasPhone){
            throw new HttpException('手机号码已存在', HttpStatus.OK);
        }
        if(isHasEmail){
            throw new HttpException('会员邮箱已存在', HttpStatus.OK);
        }
        const result = await this.memberModel.create(parameters as Member)
        if (!result) {
            throw new HttpException('系统异常，请联系管理员', HttpStatus.OK);
        }
        return result;
    }


    // 编辑会员
    async updateMember(id: string, parameters: UpdateMemberDto): Promise<Member> {
        const isHasPhone = await this.memberModel.findOne({ phone: parameters.phone });
        const isHasEmail = await this.memberModel.findOne({ email: parameters.email });
        if(isHasPhone){
            throw new HttpException('手机号码已存在', HttpStatus.OK);
        }
        if(isHasEmail){
            throw new HttpException('会员邮箱已存在', HttpStatus.OK);
        }
        const result = await this.memberModel.findByIdAndUpdate(id, parameters)
        if (!result) {
            throw new HttpException('系统异常，请联系管理员', HttpStatus.OK);
        }
        return result;
    }


    // 删除会员
    async delMember(id: string): Promise<Member> {
        const result = await this.memberModel.findByIdAndDelete(id);
        if (!result) {
            throw new HttpException('系统异常，请联系管理员', HttpStatus.OK);
        }
        return result;
    }

    // 重置会员密码
    async resetMemberPassword(id: string, newPassword: string): Promise<Member> {
        const result = await this.memberModel.findByIdAndUpdate(id, { password: newPassword })
        if (!result) {
            throw new HttpException('系统异常，请联系管理员', HttpStatus.OK);
        }
        return result;
    }
}
