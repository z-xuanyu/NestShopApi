/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-08-10 16:27:31
 * @LastEditTime: 2021-08-10 16:32:58
 * @Description: Modify here please
 */
import { Member } from '@libs/db/models/member.model';
import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { GetMembersDto } from './dto/getMembers.dto';

@Injectable()
export class MembersService {
    constructor(@InjectModel(Member)
    private readonly memberModel: ReturnModelType<typeof Member>){}


    // 获取会员列表
    async getMembers(parameters:GetMembersDto):Promise<Array<Member>>{
        const result = await this.memberModel.find({ name: { $regex: new RegExp(parameters.name, 'i') } }).limit(~~parameters.pageSize).skip(~~((parameters.pageNumber - 1) * parameters.pageSize))
        return result;
    }
}
