/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-08-09 15:39:41
 * @LastEditTime: 2021-08-09 16:11:13
 * @Description: Modify here please
 */
import { Tag } from '@libs/db/models/tag.model';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { AddTagDto } from './dto/addTag.dto';
import { GetTagListDto } from './dto/getTagList.dto';
import { UpdateTagDto } from './dto/updateTag.dto';

@Injectable()
export class TagsService {
    constructor(@InjectModel(Tag) private readonly tagModel: ReturnModelType<typeof Tag>) { }


    // 获取tag列表
    async getTags(parameters: GetTagListDto): Promise<Array<Tag>> {
        const result = await this.tagModel.find({ name: { $regex: new RegExp(parameters.name, 'i') } }).limit(~~parameters.pageSize).skip(~~((parameters.pageNumber - 1) * parameters.pageSize))
        return result
    }

    

    // 添加标签
    async addTag(parameters:AddTagDto): Promise<Tag>{
        const result = await this.tagModel.create(parameters as Tag)
        if(!result) {
            throw new HttpException('系统异常，请联系管理员', HttpStatus.OK);
        }
        return result
    }


    // 编辑标签
    async updateTag(tagId:string,parameters:UpdateTagDto):Promise<Tag>{
        const result = await this.tagModel.findByIdAndUpdate(tagId, parameters)
        if(!result) {
            throw new HttpException('系统异常，请联系管理员', HttpStatus.OK);
        }
        return result;
    }


    // 删除标签
    async delTag(tagId:string):Promise<Tag>{
        const result = await this.tagModel.findByIdAndDelete(tagId)
        if(!result) {
            throw new HttpException('系统异常，请联系管理员', HttpStatus.OK);
        }
        return result;
    }
}
