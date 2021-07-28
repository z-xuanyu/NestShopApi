/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2020-10-20 10:11:57
 * @LastEditTime: 2021-07-28 10:41:29
 * @Description: Modify here please
 */
import { Module, Global } from '@nestjs/common';
import { DbService } from './db.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from './models/user.model';
import { Category } from './models/category.model';
import { Tag } from './models/tag.model';
import { Member } from './models/member.model';
import { ReceiptAddress } from './models/receiptAddress.model';
import { Commodity } from './models/commodity.model';
import { Unit } from './models/unit.model';
import { Banner } from './models/banner.model';
import { Order } from './models/order.model';
import { Cart } from './models/protal.cart.model';
import { PortalOrder } from './models/portal.order.model';
import { Navigator } from './models/navigator.model';
import { CommoditiesRating } from './models/commoditiesRating.model';

// 导入所有的Schema模块
const models = TypegooseModule.forFeature([
  User,
  Category,
  Tag,
  Member,
  ReceiptAddress,
  Commodity,
  Unit,
  Banner,
  Order,
  Cart,
  PortalOrder,
  Navigator,
  CommoditiesRating
]);

@Global()
@Module({
  imports: [
    // 异步加载
    TypegooseModule.forRootAsync({
      useFactory(){
        return{
          uri:process.env.DB,
          useNewUrlParser: true,
          useFindAndModify: false,
          useUnifiedTopology: true,
          useCreateIndex: true,
        }
      }
    }),
    // 同步加载
    // TypegooseModule.forRoot('mongodb://localhost/nest-demo', {
    //   useNewUrlParser: true,
    //   useFindAndModify: false,
    //   useUnifiedTopology: true,
    //   useCreateIndex: true,
    // }),
    models,
  ],
  providers: [DbService],
  exports: [DbService, models],
})
export class DbModule {}
