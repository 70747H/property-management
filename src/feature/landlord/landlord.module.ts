import { Module } from '@nestjs/common';
import { LandlordService } from './landlord.service';

@Module({
  providers: [LandlordService],
})
export class LandlordModule {}
