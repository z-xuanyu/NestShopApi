/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-07-06 15:40:18
 * @LastEditTime: 2021-07-06 15:56:45
 * @Description: Modify here please
 */
// /*
//  * @Author: xuanyu
//  * @LastEditors: xuanyu
//  * @email: 969718197@qq.com
//  * @github: https://github.com/z-xuanyu
//  * @Date: 2021-07-06 15:40:18
//  * @LastEditTime: 2021-07-06 15:56:33
//  * @Description: Modify here please
//  */
// import { IoAdapter } from '@nestjs/platform-socket.io';
// import * as redisIoAdapter from 'socket.io-redis';

// export class RedisIoAdapter extends IoAdapter {
//   createIOServer(port: number): any {
//     const server = super.createIOServer(port);
//     const redisAdapter = redisIoAdapter(
//       {
//         host: process.env.REDIS_HOST,
//         port: parseInt(process.env.REDIS_PORT),
//       });
//     server.adapter(redisAdapter);
//     return server;
//   }
// }