import { ApiProperty } from "@nestjs/swagger";

export class UpdateSubCategoryDto {
    @ApiProperty({ title: "分类id" })
    name: string

    @ApiProperty({ title: "分类图片" })
    pic: string

    @ApiProperty({ title: "分类id" })
    sort: number

    @ApiProperty({ title: 'id' })
    _id: any
}