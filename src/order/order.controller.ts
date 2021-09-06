/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2020-10-20 10:11:57
 * @LastEditTime: 2021-09-06 14:31:48
 * @Description: Modify here please
 */
import { Order } from '@libs/db/models/order.model';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseResponseResult } from 'src/BaseResponseResult';
import { CreateOrderDto } from './dto/order.dto';
import { OrderService } from './order.service';
@Controller('order')
@ApiTags('后台订单管理')
export class OrderController {
  constructor(private orderService: OrderService) {};

  @Post()
  @ApiOperation({ summary: '生成订单' })
  async createOrder(@Body() parameters:CreateOrderDto):Promise<BaseResponseResult<Order>>{
    const result = await this.orderService.createOrder(parameters)
    return {
      code:1,
      message: '成功',
      result
    }
  }
}
