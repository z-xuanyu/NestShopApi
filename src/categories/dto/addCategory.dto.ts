import { ApiProperty } from "@nestjs/swagger";

/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-08-13 10:51:03
 * @LastEditTime: 2021-08-13 10:55:31
 * @Description: Modify here please
 */
export class AddGoodsCategory {
    @ApiProperty({ title: "名称" })
    name: string

    @ApiProperty({ title: '分类图片' })
    pic: string

    @ApiProperty({ title: '父级分类' })
    parentId: string | null
    

    @ApiProperty({ title: '分类排序' })
    sort: number
}