/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2020-12-11 15:26:39
 * @LastEditTime: 2021-08-09 15:35:21
 * @Description: Modify here please
 */
import { ApiProperty } from "@nestjs/swagger";
import { modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Commodity } from "./commodity.model";
import { Member } from "./member.model";

@modelOptions({
    schemaOptions:{
        timestamps:true
    }
})

export class CommoditiesRating {

    @ApiProperty({ title: '商品id' })
    @prop({ required: true ,ref: ()=> Commodity})
    commoditiesId: Ref<Commodity>

    @ApiProperty({ title: '评价用户' })
    @prop({ required: true , ref:()=> Member})
    memberId: Ref<Member>

    @ApiProperty({ title: '评价星级' })
    @prop({ required: true })
    starRating: string

    @ApiProperty({ title: '晒图' })
    @prop()
    blueprint: Array<string>

    @ApiProperty({ title: '评价内容' })
    @prop()
    ratingContent: string

    @ApiProperty({ title: '回复内容' })
    @prop()
    replyContent: string

    @ApiProperty({ title: '状态' })
    @prop({ default: true })
    status: boolean
}