/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-10-29 10:11:05
 * @LastEditTime: 2021-10-29 10:37:32
 * @Description: 自定义管道验证用户id
 */

import { HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ParseIdPipe implements PipeTransform {
    transform(value: string): string{
        if(isValidObjectId(value)){
            return value;
        }else {
            throw new HttpException('Id不存在或者不正确!', HttpStatus.BAD_REQUEST);
        }
    }
}