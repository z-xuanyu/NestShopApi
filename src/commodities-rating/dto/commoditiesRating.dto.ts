/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-09-06 14:49:52
 * @LastEditTime: 2021-09-07 16:37:34
 * @Description: Modify here please
 */

import { ApiProperty } from "@nestjs/swagger";

export class GetCommoditiesRatingsDto {
    
    @ApiProperty({ title: '页码', required: false })
    pageNumber?: number;

    @ApiProperty({ title: '条数', required: false })
    pageSize?: number;
}


export class AddCommoditiesRatingDto {
    
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


export class ReplyCommentDto{
    @ApiProperty({ title: '回复评论内容' })
    content: string;
}