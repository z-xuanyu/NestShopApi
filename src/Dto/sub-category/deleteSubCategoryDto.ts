import { ApiProperty } from "@nestjs/swagger";

export class DeleteSubCategoryDto {
    @ApiProperty({ title: "分类id" })
    subCatagoryID: any
}