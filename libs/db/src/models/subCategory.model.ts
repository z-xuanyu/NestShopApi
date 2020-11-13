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
    @prop({ required: true })
    name: string

    @ApiProperty({ title: '分类图片' })
    @prop({ required: true, })
    pic: string

    @ApiProperty({ title: '分类排序' })
    @prop()
    sort: number

    @ApiProperty({ title: "父级分类" })
    @prop({ required: true, ref: () => Category })
    parentID: Ref<Category>
}