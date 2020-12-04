import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { MulterModule } from '@nestjs/platform-express';
import { TagsModule } from './tags/tags.module';
import { MembersModule } from './members/members.module';
import { ReceiptAddressModule } from './receipt-address/receipt-address.module';
import { CommoditiesModule } from './commodities/commodities.module';
import { AuthModule } from './auth/auth.module';
import MAO = require('multer-aliyun-oss');
import { CommonModule } from '@app/common';
import { UnitModule } from './unit/unit.module';
import { BannerModule } from './banner/banner.module';
import { OrderModule } from './order/order.module';
import { ProtalHomeModule } from './protal-home/protal-home.module';
import { CartsModule } from './carts/carts.module';
import { PortalOrderModule } from './portal-order/portal-order.module';
import { SubCategoryController } from './sub-category/sub-category.controller';
import { SubCategoryModule } from './sub-category/sub-category.module';
import { NavigatorModule } from './navigator/navigator.module';
@Module({
  imports: [
    // 优先加载公共模块
    CommonModule,
    // 异步加载
    MulterModule.registerAsync({
      useFactory(){
        return {
          storage: MAO({
            config: {
              region: process.env.OSS_REGION,
              accessKeyId: process.env.OSS_ACCESS_KEY_ID,
              accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET,
              bucket: process.env.OSS_BUCKET
            }
          })
        }
      }
    }),
    // 同步
    // MulterModule.register({
    //   storage: MAO({
    //     config: {
    //       region: 'oss-cn-shenzhen',
    //       accessKeyId: 'LTAI4FzDnAmwU3RpTyFtdGsa',
    //       accessKeySecret: 'zot5lHfGOzbjHKLYnUNwmzBGSbHLgs',
    //       bucket: 'nestshop',
    //     },
    //   }),
    //   // dest: 'uploads',
    // }),
    UsersModule,
    CategoriesModule,
    TagsModule,
    MembersModule,
    ReceiptAddressModule,
    CommoditiesModule,
    AuthModule,
    UnitModule,
    BannerModule,
    OrderModule,
    ProtalHomeModule,
    CartsModule,
    PortalOrderModule,
    SubCategoryModule,
    NavigatorModule
  ],
  controllers: [AppController, SubCategoryController],
})
export class AppModule {}
