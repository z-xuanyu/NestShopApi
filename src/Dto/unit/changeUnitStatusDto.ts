import { ApiPropertyOptional } from "@nestjs/swagger";

export class changeUnitStatusDto {
    @ApiPropertyOptional({title:"id"})
    unitID:string;

    @ApiPropertyOptional({title:'状态'})
    status:boolean
}