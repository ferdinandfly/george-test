import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {PromotionCodeInterface} from "./interfaces/promotion-code.interface";
import {Repository} from "typeorm";
import {PromotionCodeDto} from "./dto/promotion-code.dto";
import {RequestPromotionArgumentDto} from "./dto/request-promotion.dto";
import {EqualAgeRestriction, IntervalAgeRestriction, RestrictionInterface} from "./interfaces/restriction.interface";

@Injectable()
export class PromotionService {
    constructor(
        @InjectRepository(PromotionCodeInterface)
        private readonly promotionRepo: Repository<PromotionCodeInterface>,
    ) {
    }

    async createPromotion(promotionDto: PromotionCodeDto) {
        return this.promotionRepo.create(promotionDto);
    }

    async findAll(): Promise<PromotionCodeInterface[]> {
        return this.promotionRepo.find();
    }

    async findByName(name: string): Promise<PromotionCodeInterface> {
        return this.promotionRepo.findOne({where: {name}});
    }

    checkPromotion(promotionRequestArgument: RequestPromotionArgumentDto, restriction: RestrictionInterface): boolean {
        if (promotionRequestArgument.age && restriction.age) {
            if (!(
                (restriction.age as EqualAgeRestriction).eq === promotionRequestArgument.age
                || (
                    (restriction.age as IntervalAgeRestriction).lt < promotionRequestArgument.age
                    && (restriction.age as IntervalAgeRestriction).gt > promotionRequestArgument.age
                )
            )) {
                return false;
            }
        }

        if (promotionRequestArgument.meteo && restriction.meteo) {
            if (!(
                    restriction.meteo && restriction.meteo.temp &&
                    restriction.meteo.temp.lt < promotionRequestArgument.meteo.temp &&
                    restriction.meteo.temp.gt > promotionRequestArgument.meteo.temp
                )
                || !(restriction.meteo && restriction.meteo.is &&
                    restriction.meteo.is === promotionRequestArgument.meteo.is
                )
            ) {

                return false;
            }
        }
        if (promotionRequestArgument.date && restriction.date) {

            const past = new Date(restriction.date.after);
            const future = new Date(restriction.date.before);
            const now = new Date(promotionRequestArgument.date);
            if (now < past || now > future)
                return false;
        }

        if (promotionRequestArgument.or && restriction.or) {
            if (!promotionRequestArgument.or.find(argument =>
                restriction.or.find(
                    r => this.checkPromotion(argument, r)
                ))) {
                return false;
            }
        }else if (restriction.or){
            return false;
        }

        return true;
    }
}
