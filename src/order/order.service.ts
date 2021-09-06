/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-09-03 16:30:19
 * @LastEditTime: 2021-09-06 14:28:25
 * @Description: Modify here please
 */
import { Order } from '@libs/db/models/order.model';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { CreateOrderDto } from './dto/order.dto';

@Injectable()
export class OrderService {
    constructor(@InjectModel(Order) private readonly orderModel: ReturnModelType<typeof Order>){};

    // 生成订单
    async createOrder(parameters: CreateOrderDto):Promise<Order>{
        const result = await this.orderModel.create(parameters as any);
        if(!result) {
            throw new HttpException('系统异常，请联系管理员', HttpStatus.OK);
        }
        return result;
    }
}
