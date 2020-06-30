import { Controller } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Commodity } from '@libs/db/models/commodity.model';
import { Crud } from 'nestjs-mongoose-crud';
import { ApiTags } from '@nestjs/swagger';

@Crud({
  model: Commodity,
})
@Controller('commodities')
@ApiTags('后台商品管理')
export class CommoditiesController {
  constructor(@InjectModel(Commodity) private readonly model) {}
}
