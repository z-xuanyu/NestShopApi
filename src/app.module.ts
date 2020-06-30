import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DbModule } from '@libs/db';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { MulterModule } from '@nestjs/platform-express';
import { TagsModule } from './tags/tags.module';
import { MembersModule } from './members/members.module';
import { ReceiptAddressModule } from './receipt-address/receipt-address.module';
import { CommoditiesModule } from './commodities/commodities.module';
import MAO = require('multer-aliyun-oss');
@Module({
  imports: [
    MulterModule.register({
      storage: MAO({
        config: {
          region: 'oss-cn-shenzhen',
          accessKeyId: 'LTAI4FzDnAmwU3RpTyFtdGsa',
          accessKeySecret: 'zot5lHfGOzbjHKLYnUNwmzBGSbHLgs',
          bucket: 'nestshop',
        },
      }),
      // dest: 'uploads',
    }),
    DbModule,
    UsersModule,
    CategoriesModule,
    TagsModule,
    MembersModule,
    ReceiptAddressModule,
    CommoditiesModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
