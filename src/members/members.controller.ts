import { Controller } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Member } from '@libs/db/models/member.model';
import { Crud } from 'nestjs-mongoose-crud';
import { ApiTags } from '@nestjs/swagger';

@Crud({
  model: Member,
})
@Controller('members')
@ApiTags('后台会员管理')
export class MembersController {
  constructor(@InjectModel(Member) private readonly model) {}
}
