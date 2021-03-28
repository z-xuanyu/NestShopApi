import { ApiProperty } from "@nestjs/swagger";
import { modelOptions, prop } from "@typegoose/typegoose";

@modelOptions({
    schemaOptions:{
        timestamps:true
    }
})

export class CommoditiesRating {

    @ApiProperty({ title: '商品图片' })
    @prop({ required: true })
    commoditiesPic: string

    @ApiProperty({ title: '商品名称' })
    @prop({ required: true })
    commoditiesName: string

    @ApiProperty({ title: '评价用户信息' })
    @prop({ required: true })
    ratingMemberInfo: string

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