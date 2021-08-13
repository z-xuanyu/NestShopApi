/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-08-13 16:58:18
 * @LastEditTime: 2021-08-13 17:07:04
 * @Description: Modify here please
 */
import { ApiProperty } from "@nestjs/swagger";

export class AddCommodityDto {
    @ApiProperty({ title: '商品名称' })
    name: string

    @ApiProperty({ title: '商品副标题' })
    subTitle: string

    @ApiProperty({ title: '商品分类，可以多个分类' })
    categories?: Array<string>

    @ApiProperty({ title: '折扣价' })

    discountPrice: number;

    @ApiProperty({ title: '定价' })
    price: number;

    @ApiProperty({ title: '热门推荐' })
    isRecommend: number;

    @ApiProperty({ title: '新品' })
    isNewest: number;

    @ApiProperty({ title: '状态' })
    status: number;

    @ApiProperty({ title: '描述' })
    desc: string;

    @ApiProperty({ title: '商品主图' })
    coverImg: string

    @ApiProperty({ title: '商品详情图片' })
    imgPathList: Array<string>;

    @ApiProperty({ title: '商品轮播图' })
    bannerPathList: Array<string>;
}