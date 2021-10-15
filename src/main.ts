/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2020-10-20 10:11:57
 * @LastEditTime: 2021-09-07 17:14:33
 * @Description: Modify here please
 */
import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { HttpExceptionFilter } from '@app/common/filters/http-exception.filter';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 处理跨域
  app.enableCors();
  // 托管静态文件
  app.useStaticAssets('uploads', {
    prefix: '/uploads',
  });
  // swagger 文档配置
  const options = new DocumentBuilder()
    .setTitle('小商城api文档')
    .setDescription('这是个小商城练习项目的api文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  // 访问频率限制
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15分钟
      max: 50000, // 限制15分钟内最多只能访问50000次
    }),
  );
  // Web漏洞的
  app.use(helmet());
  const PORT = process.env.SERVER_PORT || 3000
  // 全局注册错误的过滤器(错误异常)
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(PORT);

  console.log(`接口文档：http://localhost:${PORT}/api-docs`);
}
bootstrap();
