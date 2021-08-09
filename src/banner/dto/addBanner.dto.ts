import { ApiProperty } from "@nestjs/swagger";

/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-08-09 16:23:07
 * @LastEditTime: 2021-08-09 16:27:08
 * @Description: Modify here please
 */
export class AddBannerDto {
    @ApiProperty({ title: '名称' })
    name: string

    @ApiProperty({ title: 'url' })
    url: string


    @ApiProperty({ title: '类型' })
    type: number
    
    @ApiProperty({ title: '外链链接', required: false })
    targetUrl: string

    @ApiProperty({ title: '关联的商品id', required: false })
    commodityId: string
}