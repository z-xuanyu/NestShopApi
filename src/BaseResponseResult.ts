/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-08-04 11:35:47
 * @LastEditTime: 2021-08-04 11:38:17
 * @Description: Modify here please
 */
export class BaseResponseResult<T>{
    code: number;
    result: T;
    message: string
}