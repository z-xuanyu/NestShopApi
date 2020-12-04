import { ApiProperty } from "@nestjs/swagger";
import { modelOptions, prop } from "@typegoose/typegoose";
@modelOptions({
    schemaOptions:{
        timestamps:true
    }
})

export class Navigator{
    @ApiProperty({title:"名称"})
    @prop({required:true})
    name:string

    @ApiProperty({title:"图标"})
    @prop({required:true})
    icon:string

    @ApiProperty({title:"图标链接"})
    @prop({required:true})
    url:string

    @ApiProperty({title:"排序"})
    @prop({default:1})
    sort:number

    @ApiProperty({title:"状态"})
    @prop({default:true})
    status:boolean
}