import { ApiProperty } from "@nestjs/swagger";

/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-09-02 10:29:32
 * @LastEditTime: 2021-09-02 10:31:13
 * @Description: Modify here please
 */
export class GetOrders {
    @ApiProperty({ title: '页码', required: false })
    pageNumber: number;

    @ApiProperty({ title: '条数', required: false })
    pageSize: number;

    @ApiProperty({ title: '名称', required: false })
    name: string;
}
