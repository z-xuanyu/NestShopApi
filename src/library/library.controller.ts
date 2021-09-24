/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-09-18 10:10:31
 * @LastEditTime: 2021-09-23 15:57:25
 * @Description: Modify here please
 */
import { Body, Controller, Delete, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DelImage } from './dto/library.dto';
import { LibraryService } from './library.service';


@ApiTags('媒体素材库')
@Controller('library')
export class LibraryController {
    constructor(private libraryService: LibraryService) { };

    @Get()
    @ApiOperation({ summary: '获取素材库资源列表' })
    async list(): Promise<any> {
        const result = await this.libraryService.getAllLibrary();
        const sortResult = result.objects.sort((a, b)=> a.lastModified < b.lastModified ? 1 : -1)
        return {
            code: 1,
            message: '成功',
            result: {
                items: sortResult,
                total: result.objects.length
            },
        }
    }


    @Delete()
    @ApiOperation({ summary: '删除文件' })
    async delete(@Body() parameters: DelImage): Promise<any> {
        console.log(parameters, 5445787)
        const result = await this.libraryService.delLibrary(parameters.name);
        return {
            code: 1,
            message: '成功',
            result,
        }
    }
}
