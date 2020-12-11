import { CommoditiesRating } from '@libs/db/models/commoditiesRating.model';
import { Controller, UseGuards } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { Crud } from 'nestjs-mongoose-crud';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Crud({
     model:CommoditiesRating,
     routes:{
        find:{
            decorators:[ApiOperation({ summary: '查询商品评价列表' })]
        },
        findOne:{
            decorators:[ApiOperation({summary:'查询商品评价信息'})]
        },
        create:{
            decorators:[ApiOperation({summary:'添加商品评价'})]
        },
        update:{
            decorators:[ApiOperation({summary:'更新商品评价信息'})]
        },
        delete:{
            decorators:[ApiOperation({summary:'删除商品评价信息'})]
        }
     }
})
@Controller('commodities-rating')
@ApiTags('后台商品评价管理')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class CommoditiesRatingController {
    constructor(@InjectModel(CommoditiesRating) private readonly model:ModelType<CommoditiesRating>){}
}
