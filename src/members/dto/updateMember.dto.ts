import { ApiProperty } from "@nestjs/swagger";

/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-08-12 12:21:51
 * @LastEditTime: 2021-09-03 16:15:44
 * @Description: Modify here please
 */
export class UpdateMemberDto{
    @ApiProperty({title:'会员名称', required:true})
    name:string

    @ApiProperty({title:'会员密码', required:true})
    password:string

    @ApiProperty({ title: '手机号码', required:true})
    phone: string

    @ApiProperty({ title: '邮箱' , required: false })
    email?: string;

    @ApiProperty({ title: '会员头像' , required: false })
    avatarImg?: string;
}