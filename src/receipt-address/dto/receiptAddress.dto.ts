import { ApiProperty } from "@nestjs/swagger";

/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-09-03 16:44:59
 * @LastEditTime: 2021-09-03 17:09:25
 * @Description: Modify here please
 */
export class GetReceiptAddressList{
    @ApiProperty({ title: '条数', required: false })
    pageSize: number

    @ApiProperty({ title: '页码', required: false })
    pageNumber: number

    @ApiProperty({ title: '会员id' })
    userId: string;

    @ApiProperty({title: '名字' , required: false})
    name: string
}


export class AddReceiptAddress {
    @ApiProperty({ title: '会员id' })
    userId: string;

    @ApiProperty({title: '名字'})
    name: string;

    @ApiProperty({title: '电话'})
    phone: string;

    @ApiProperty({title: '地址'})
    address: string;

    @ApiProperty({title: '邮编', required: false})
    postalCode: string | number;

    @ApiProperty({title: '默认', required: false})
    isDefaule: string | number;
}


export class UpdateReceiptAddress {
    @ApiProperty({ title: '会员id' })
    userId: string;

    @ApiProperty({title: '名字'})
    name: string;

    @ApiProperty({title: '电话'})
    phone: string;

    @ApiProperty({title: '地址'})
    address: string;

    @ApiProperty({title: '邮编', required: false})
    postalCode: string | number;

    @ApiProperty({title: '默认', required: false})
    isDefaule: string | number;
}