/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-09-28 16:42:55
 * @LastEditTime: 2021-09-28 17:21:30
 * @Description: Modify here please
 */
import { ApiProperty } from '@nestjs/swagger';
import { prop, ModelOptions, Ref } from '@typegoose/typegoose';
import { Member } from './member.model';
import { User } from './user.model';

@ModelOptions({ schemaOptions: { timestamps: true } })
export class ChatMessage {
    
    @ApiProperty({ title:"后台客服id" })
    @prop({ ref: ()=> User })
    adminId: Ref<User>

    @ApiProperty({ title: '客户端会员id' })
    @prop({ ref: ()=> Member })
    memberId: Ref<Member>;

    @ApiProperty({ title: '信息类型' })
    @prop({ default: 'text' })
    messageType: string;

    @ApiProperty({ title: '信息内容' })
    @prop()
    content: string;

    @ApiProperty({ title: '是否已读' })
    @prop({ default: false })
    isRead: boolean;
}
