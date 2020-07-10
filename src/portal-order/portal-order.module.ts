import { Module } from '@nestjs/common';
import { PortalOrderController } from './portal-order.controller';

@Module({
  controllers: [PortalOrderController]
})
export class PortalOrderModule {}
