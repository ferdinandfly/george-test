import {Body, Controller, Get, HttpException, HttpStatus, Post} from '@nestjs/common';
import {PromotionCodeDto} from "./dto/promotion-code.dto";
import {PromotionService} from "./promotion.service";
import {RequestPromotionDto} from "./dto/request-promotion.dto";
import {RequestPromotionFailed, RequestPromotionSuccess} from "./dto/response-promotion.dto";
import {
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiResponse,
    ApiTags,
    ApiUnprocessableEntityResponse
} from "@nestjs/swagger";

@ApiTags('promotion')
@Controller('promotion')
export class PromotionController {
    constructor(private readonly promotionService: PromotionService) {
    }

    @Get('list')
    async list() {
        return this.promotionService.findAll();
    }

    @Post('create')
    @ApiCreatedResponse({
        description: 'create a promotion code success',
        status: HttpStatus.OK
    })
    @ApiUnprocessableEntityResponse({
        description: 'failed to created promodtion code',
        status: HttpStatus.INTERNAL_SERVER_ERROR
    })
    async createPromotionCode(@Body() promotionDto: PromotionCodeDto) {
        return this.promotionService.createPromotion(promotionDto);
    }

    @Post('request')
    @ApiResponse({
        description: 'require a promotion success',
        type: RequestPromotionSuccess,
        status: HttpStatus.OK,
    })
    @ApiNotFoundResponse({
        description: 'require a promotion failed',
        type: RequestPromotionFailed
    })
    async requestPromotion(@Body() promodtionRequest: RequestPromotionDto): Promise<RequestPromotionSuccess | RequestPromotionFailed> {
        return this.promotionService.findByName(promodtionRequest.promocode_name)
            .then(promotionCode => {
                if (promotionCode && this.promotionService.checkPromotion(promodtionRequest.arguments, promotionCode.restrictions)) {
                    return {
                        status: 'accepted',
                        avantage: {
                            percent: promotionCode.avantage.percent
                        }
                    }
                }

                throw new HttpException({
                    status: 'refused',
                    reasons: {
                        promotionCode: 'can not find the promotion code'
                    }
                }, HttpStatus.BAD_REQUEST);

            })
    }
}
