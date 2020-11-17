import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Cart } from '@libs/db/models/protal.cart.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { addCartDto, getCartInfoDto } from './dto/carts.dto';
import { Commodity } from '@libs/db/models/commodity.model';
import { Crud } from 'nestjs-mongoose-crud';
@Crud({
  model: Cart,
  routes: {
    find: false,
    update: false,
    create: false,
    findOne: false,
    delete: {
      decorators: [ApiOperation({ summary: '删除购物商品' })],
    },
  },
})
@Controller('carts')
@ApiTags('客户端用户购物车')
export class CartsController {
  constructor(
    @InjectModel(Cart) private readonly cartModel: ReturnModelType<typeof Cart>,
    @InjectModel(Commodity)
    private readonly commodityModel: ReturnModelType<typeof Commodity>,
    @InjectModel(Cart) private readonly model,
  ) { }

  @Post('addCart')
  @ApiOperation({ summary: '加入购物车' })
  async addCart(@Body() addCart: addCartDto): Promise<any> {
    const { userID, commodityID } = addCart;
    // 查找用户是否有购物车信息
    const userCartInfo = await this.cartModel.find({ userID: userID });
    // 如果用户购物车有商品，再查询商品是否存在,追加商品
    if (userCartInfo.length) {
      // 查找购物车商品
      const isCommodityID = await this.cartModel.find({
        commodityID: commodityID,
      });
      // 如果商品存在，追加商品数量
      if (isCommodityID.length) {
        await this.cartModel.updateOne(
          { userID: userID },
          { $set: { quantity: isCommodityID[0].quantity + 1 } },
        );
        return { code: 1, msg: '商品追加添加成功' };
      } else {
        return { code: 0, msg: '追加失败' };
      }
    } else {
      // 如果用户购物车没有商品，则添加商品
      const res = await this.cartModel.create(addCart as Cart);
      if (res) return { code: 1, msg: '添加成功' };
    }
  }

  @Get('getCartInfo')
  @ApiOperation({ summary: '查看用户购物车信息' })
  async getCartInfo(@Query() getCartInfo: getCartInfoDto): Promise<any> {
    const { userID } = getCartInfo;
    // 查询出用户的购物车信息
    const userCartInfo = await this.cartModel
      .find({ userID: userID })
      .populate('commodityID');

    return userCartInfo.map((v) => {
      return {
        quantity: v.quantity,
        commodityItem: v.commodityID,
        _id: v._id,
      };
    });
  }
}
