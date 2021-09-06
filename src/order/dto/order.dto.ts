import { ApiProperty } from "@nestjs/swagger";

/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-09-02 10:29:32
 * @LastEditTime: 2021-09-06 14:44:19
 * @Description: Modify here please
 */
export class GetOrdersDto {
    @ApiProperty({ title: '页码', required: false })
    pageNumber: number;

    @ApiProperty({ title: '条数', required: false })
    pageSize: number;

    @ApiProperty({ title: '名称', required: false })
    name: string;
}

class OrderCommodityList {
    @ApiProperty({ title: '商品id' })
    commodityId: string;

    @ApiProperty({ title: '商品数量' })
    commodityNum: number;
}

export class CreateOrderDto {
    @ApiProperty({ title: '会员id' })
    memberId: string;

    
    @ApiProperty({ title: '收货地址id' })
    receiptAddressId: string;


    @ApiProperty({ title: '选购商品', type: [OrderCommodityList] })
    commodityList: OrderCommodityList[];

    @ApiProperty({ title: '支付方式', required: false })
    paymentType: number;
}