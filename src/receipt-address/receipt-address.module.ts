import { Module } from '@nestjs/common';
import { ReceiptAddressController } from './receipt-address.controller';

@Module({
  controllers: [ReceiptAddressController]
})
export class ReceiptAddressModule {}
