import { ApiProperty } from "@nestjs/swagger";

/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-08-10 16:21:16
 * @LastEditTime: 2021-08-10 16:22:30
 * @Description: Modify here please
 */
export class SendEmailToMemberDto {
    @ApiProperty({ title: '邮件标题' })
    title:string

    @ApiProperty({ title: '邮件内容' })
    content:string
}