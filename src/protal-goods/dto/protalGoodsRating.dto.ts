import { ApiProperty } from "@nestjs/swagger";

/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-09-07 14:55:28
 * @LastEditTime: 2021-09-10 10:03:38
 * @Description: Modify here please
 */
export class AddGoodssRatingDto {
    
    @ApiProperty({ title: '商品id' })
    commoditiesId: string;

    @ApiProperty({ title: '评价用户' })
    memberId: string;

    @ApiProperty({ title: '评价星级' })
    starRating: string;

    @ApiProperty({ title: '晒图' , required: false })
    blueprint: Array<string>;

    @ApiProperty({ title: '评价内容', required: false })
    ratingContent: string;

}