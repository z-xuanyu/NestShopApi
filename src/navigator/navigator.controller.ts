import { Controller, UseGuards } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { Navigator} from '@libs/db/models/navigator.model'
import { Crud } from "nestjs-mongoose-crud"
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Crud({
    model:Navigator,
    routes:{
        create:{
            decorators:[ApiOperation({ summary: '添加导航' })]
        },
        find:{
            decorators:[ApiOperation({ summary: '导航列表' })]
        },
        findOne:{
            decorators:[ApiOperation({ summary: '导航信息' })]
        },
        update:{
            decorators:[ApiOperation({ summary: '更新导航信息' })]
        },
        delete:{
            decorators:[ApiOperation({ summary: '删除导航信息' })]
        }
    }
})

@Controller('navigator')
@ApiTags('后台导航管理')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class NavigatorController {
    constructor(@InjectModel(Navigator) private readonly model:ModelType<Navigator>){}
}
