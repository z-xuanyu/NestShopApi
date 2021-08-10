import { ApiProperty } from "@nestjs/swagger";

/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-08-10 12:05:53
 * @LastEditTime: 2021-08-10 12:14:50
 * @Description: Modify here please
 */
export class AddOrUpdateUnitDto {
    @ApiProperty({title: '名称'})
    name: string
}