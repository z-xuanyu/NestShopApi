/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-09-07 16:47:18
 * @LastEditTime: 2021-09-10 10:28:34
 * @Description: 异常错误拦截处理
 */
import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    Logger,
  } from '@nestjs/common';
  @Catch()
  export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): any {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      const request = ctx.getRequest();
      const status =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;
  
      let message = exception.message;
      let code = 1;
      try {
        const messageObj = JSON.parse(exception.message);
        message = messageObj.message;
        code = messageObj.code;
      } catch (e) { }
      Logger.log(exception, '错误提示');
      Logger.log(message, '错误信息');
      if(message.includes("ObjectId")){
          message = 'id不存在!'
      }
      const errorResponse = {
        status,
        message,
        code, // 自定义code
        path: request.url, // 错误的url地址
        method: request.method, // 请求方式
        timestamp: new Date().toLocaleDateString(), // 错误的时间
      };
      // 打印日志
      Logger.error(
        `【${Date.now()}】${request.method} ${request.url}`,
        JSON.stringify(errorResponse),
        'HttpExceptionFilter',
      );
      // 设置返回的状态码、请求头、发送错误信息
      response.status(status);
      response.header('Content-Type', 'application/json; charset=utf-8');
      response.send(errorResponse);
    }
  }
  