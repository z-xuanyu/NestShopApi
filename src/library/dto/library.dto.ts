import { ApiProperty } from "@nestjs/swagger";

/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-09-23 15:27:31
 * @LastEditTime: 2021-09-23 15:27:31
 * @Description: Modify here please
 */
export class DelImage{
    @ApiProperty({ title:'文件名' })
    name: string;
}