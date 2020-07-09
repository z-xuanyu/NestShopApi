import { Controller, Get, Post, Body } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Cart } from '@libs/db/models/protal.cart.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { addCartDto } from './dto/carts.dto';

@Controller('carts')
@ApiTags("客户端用户购物车")
export class CartsController {
  constructor(
    @InjectModel(Cart) private readonly cartModel: ReturnModelType<typeof Cart>,
  ) {}

  @Post()
  @ApiOperation({ summary: '加入购物车' })
  async addCart(@Body() addCartDto: addCartDto) {
    const { userID, commodityID } = addCartDto;

    // 查找用户是否有购物车信息
    const userCartInfo = await this.cartModel.find({ userID: userID });
    // 如果用户购物车有商品，再查询商品是否存在,追加商品
    if (userCartInfo) {
      // 查找购物车商品
      const isCommodityID = await this.cartModel.find({
        commodityID:{$elemMatch:{$eq:commodityID}}
      })
      // 如果商品存在，追加商品数量
      if (isCommodityID.length) {
        await this.cartModel.updateOne(
          { userID: userID },
          { $set: { quantity: isCommodityID[0].quantity + 1 } },
        );

        return { code: 1, msg: '添加成功' };
      }
    } else {
      // 如果用户购物车没有商品，则添加商品
    //   const res = await this.cartModel.create({userID,commodityID,quantity:1});
    //   if (res) return { code: 1, msg: '添加成功' };
    }
  }
}
