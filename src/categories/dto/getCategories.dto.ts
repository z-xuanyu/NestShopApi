import { ApiProperty } from "@nestjs/swagger";

/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-08-13 10:49:11
 * @LastEditTime: 2021-08-13 11:34:16
 * @Description: Modify here please
 */
export class GetGoodsCategoriesDto{
    
    @ApiProperty({ title: '每页数量', default: 10, required: false })
    pageSize: number;

    @ApiProperty({ title: '页数', default: 1, required: false })
    pageNumber: number;

    @ApiProperty({ title: '名称' , required: false})
    name: string
}