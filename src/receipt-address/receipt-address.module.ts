import { Module } from '@nestjs/common';
import { ReceiptAddressController } from './receipt-address.controller';
import { ReceiptAddressService } from './receipt-address.service';

@Module({
  controllers: [ReceiptAddressController],
  providers: [ReceiptAddressService]
})
export class ReceiptAddressModule {}
