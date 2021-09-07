/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2020-10-20 10:11:57
 * @LastEditTime: 2021-09-07 15:09:24
 * @Description: Modify here please
 */
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
import { NavigatorModule } from './navigator/navigator.module';
import { SendMailModule } from './send-email/send-email.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter} from '@nestjs-modules/mailer/dist/adapters/pug.adapter'
import path = require('path');
import { RoleModule } from './role/role.module';
import { MenuModule } from './menu/menu.module';
import { InitDbModule } from './init-db/init-db.module';
import { CommoditiesRatingModule } from './commodities-rating/commodities-rating.module';
import { ProtalGoodsModule } from './protal-goods/protal-goods.module';
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
    AuthModule,
    UsersModule,
    CategoriesModule,
    TagsModule,
    MembersModule,
    ReceiptAddressModule,
    CommoditiesModule,
    CommoditiesRatingModule,
    UnitModule,
    BannerModule,
    OrderModule,
    NavigatorModule,
    SendMailModule,
    MailerModule.forRootAsync({
			useFactory: () => ({
				transport: 'smtps://812006298@qq.com:fttlcuxaqxeobdhg@smtp.qq.com',
				defaults: {
					from: '"测试" <812006298@qq.com>'
				},
				template: {
                    // dir: process.cwd() + '/src/template/', // 这一句不用配置，可以找到路径
                    dir: path.join(__dirname, './send-email/template'),
					adapter: new PugAdapter(),
					options: {
						strict: true
					}
				}
			})
		}),
    RoleModule,
    MenuModule,
    InitDbModule,
    ProtalHomeModule,
    ProtalGoodsModule,
    CartsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
