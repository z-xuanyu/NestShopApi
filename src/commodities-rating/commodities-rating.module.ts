import { Module } from '@nestjs/common';
import { CommoditiesRatingService } from './commodities-rating.service';

@Module({
  providers: [CommoditiesRatingService]
})
export class CommoditiesRatingModule {}
