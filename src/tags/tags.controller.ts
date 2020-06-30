import { Controller } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Tag } from '@libs/db/models/tag.model';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from 'nestjs-mongoose-crud';

@Crud({
  model: Tag,
})
@Controller('tags')
@ApiTags('后台标签管理')
export class TagsController {
  constructor(@InjectModel(Tag) private readonly model) {}
}
