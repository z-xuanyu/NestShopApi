import { ApiProperty } from "@nestjs/swagger";

/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-08-31 12:00:05
 * @LastEditTime: 2021-08-31 14:23:17
 * @Description: Modify here please
 */
export class GetNavigatorDto {
    @ApiProperty({ title: '名称', required: false })
    name: string;
    @ApiProperty({ title: '页码', required: false })
    pageNumber?: number;
    @ApiProperty({ title: '条数', required: false })
    pageSize?: number;
}


export class AddNavigatorDto {
    @ApiProperty({ title: '名称' })
    name: string;
    @ApiProperty({ title: '导航图标' })
    icon: string;
    @ApiProperty({ title: '链接' })
    url: string;
    @ApiProperty({ title: '排序', default: 1 })
    sort: number;
    @ApiProperty({ title: '状态', default: true })
    status: boolean;
}

export class UpdateNavigatorDto {
    @ApiProperty({ title: '名称' })
    name: string;
    @ApiProperty({ title: '导航图标' })
    icon: string;
    @ApiProperty({ title: '链接' })
    url: string;
    @ApiProperty({ title: '排序' })
    sort: number;
    @ApiProperty({ title: '状态' })
    status: boolean;
}