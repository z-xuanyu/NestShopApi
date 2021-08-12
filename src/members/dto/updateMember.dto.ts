import { ApiProperty } from "@nestjs/swagger";

/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-08-12 12:21:51
 * @LastEditTime: 2021-08-12 12:23:25
 * @Description: Modify here please
 */
export class UpdateMemberDto{
    @ApiProperty({ title: "名称" })
    name: string

    
}