import {Module} from '@nestjs/common';
import {PromotionModule} from './promotion/promotion.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {PromotionCodeInterface} from "./promotion/interfaces/promotion-code.interface";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mongodb',
            host: process.env.DB_HOST,
            database: 'promotion',
            entities: [PromotionCodeInterface],
            synchronize: true,
        }),
        PromotionModule
    ],
})
export class AppModule {
}
