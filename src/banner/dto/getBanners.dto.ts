import { ApiProperty } from "@nestjs/swagger";

/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-08-09 16:33:09
 * @LastEditTime: 2021-08-09 16:35:47
 * @Description: Modify here please
 */
export class GetBannersDto {
    @ApiProperty({ title: '条数', required: false })
    pageSize: number

    @ApiProperty({ title: '页码', required: false })
    pageNumber: number

    @ApiProperty({ title: '名称', required: false })
    name: string
}