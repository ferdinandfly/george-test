import { Module } from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { PromotionController } from './promotion.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {PromotionCodeInterface} from "./interfaces/promotion-code.interface";

@Module({

  imports: [TypeOrmModule.forFeature([PromotionCodeInterface])],
  providers: [PromotionService],

  controllers: [PromotionController]
})
export class PromotionModule {}
