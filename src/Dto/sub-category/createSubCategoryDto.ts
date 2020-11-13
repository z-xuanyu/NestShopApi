import { ApiProperty } from "@nestjs/swagger";

export class craeteSubCategoryDto {
    @ApiProperty({ title: "名称" })
    name: string

    @ApiProperty({ title: "分类图片" })
    pic: string

    @ApiProperty({ title: "分类排序" })
    sort: number

    @ApiProperty({ title: "分类状态" })
    status: boolean
    
    @ApiProperty({ title: "父级ID" })
    parentID: any
}