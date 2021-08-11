import { ApiProperty } from "@nestjs/swagger";

/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-08-10 14:45:14
 * @LastEditTime: 2021-08-10 14:46:28
 * @Description: Modify here please
 */
export class GetMembersDto {
    @ApiProperty({ title: '每一页数量', default: 10, required: false })
    pageSize: number;

    @ApiProperty({ title: '页数', default: 1, required: false })
    pageNumber: number;

    @ApiProperty({title:'名称', required: false})
    name: string
}