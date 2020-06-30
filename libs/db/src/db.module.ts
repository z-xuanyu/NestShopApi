import { Module, Global } from '@nestjs/common';
import { DbService } from './db.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from './models/user.model';
import { Category } from './models/category.model';
import { Tag } from './models/tag.model';
import { Member } from './models/member.model';
import { ReceiptAddress } from './models/receiptAddress.model';
import { Commodity } from './models/commodity.model';

const models = TypegooseModule.forFeature([User, Category, Tag, Member,ReceiptAddress,Commodity]);

@Global()
@Module({
  imports: [
    TypegooseModule.forRoot('mongodb://121.42.14.221:27017/nest-demo', {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }),
    models,
  ],
  providers: [DbService],
  exports: [DbService, models],
})
export class DbModule {}
