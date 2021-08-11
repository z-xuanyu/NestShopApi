import { ApiProperty } from "@nestjs/swagger";

/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-08-10 15:09:32
 * @LastEditTime: 2021-08-10 15:23:29
 * @Description: Modify here please
 */
export class AddMemberDto {
    @ApiProperty({title:'会员名称', required:true})
    name:string

    @ApiProperty({title:'会员密码', required:true})
    password:string

    @ApiProperty({ title: '手机号码', required:true})
    phone: string
}