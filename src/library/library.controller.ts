/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-09-18 10:10:31
 * @LastEditTime: 2021-09-18 11:10:53
 * @Description: Modify here please
 */
import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LibraryService } from './library.service';


@ApiTags('媒体素材库')
@Controller('library')
export class LibraryController {
    constructor(private libraryService: LibraryService){};

    @Get()
    @ApiOperation({ summary: '获取素材库资源列表' })
    async list():Promise<any> {
        return await this.libraryService.getAllLibrary();
    }
}
