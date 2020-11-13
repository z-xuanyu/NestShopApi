import { ApiProperty } from "@nestjs/swagger";
import { ModelOptions, prop, Ref } from "@typegoose/typegoose";
import { Category } from "./category.model";

@ModelOptions({
    schemaOptions: {
        timestamps: true,
    },
})

export class SubCategory {
    @ApiProperty({ title: "名称" })
    @prop({ required: true, unique: true })
    name: string

    @ApiProperty({ title: '分类图片', example: "https://wxt.sinaimg.cn/large/007XivJ0gy1g93mawj6coj30qn0qnabt.jpg" })
    @prop({ required: true, })
    pic: string

    @ApiProperty({ title: '分类排序' })
    @prop({ default: 1 })
    sort: number

    @ApiProperty()
    @prop({ default: true })
    status: boolean

    @ApiProperty({ title: "父级分类" })
    @prop({ required: true, ref: () => Category })
    parentID: Ref<Category>
}