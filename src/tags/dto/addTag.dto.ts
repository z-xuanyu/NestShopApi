import { ApiProperty } from "@nestjs/swagger";

/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-08-09 15:47:11
 * @LastEditTime: 2021-08-09 15:48:23
 * @Description: Modify here please
 */
export class AddTagDto {
    @ApiProperty({ title: '名称' })
    name: string
}