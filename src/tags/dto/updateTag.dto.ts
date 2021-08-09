import { ApiProperty } from "@nestjs/swagger";

/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-08-09 15:52:00
 * @LastEditTime: 2021-08-09 16:11:06
 * @Description: Modify here please
 */
export class UpdateTagDto {
    @ApiProperty({ title: '名称' })
    name: string
}