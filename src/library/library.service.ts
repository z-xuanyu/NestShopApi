/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-09-18 10:10:45
 * @LastEditTime: 2021-09-18 11:02:06
 * @Description: Modify here please
 */
import { Injectable } from '@nestjs/common';
import * as OSS from 'ali-oss';
@Injectable()
export class LibraryService {
    ossClient = new OSS({
        region: process.env.OSS_REGION,
        accessKeyId: process.env.OSS_ACCESS_KEY_ID,
        accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET,
        bucket: process.env.OSS_BUCKET,
      });
     // 获取列表
    async getAllLibrary():Promise<any> {
        const result = await this.ossClient.list({
            'max-keys': 20,
          })
        return result;
    }
}
