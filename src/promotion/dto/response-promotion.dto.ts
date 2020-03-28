import {ApiProperty} from "@nestjs/swagger";

export class RequestPromotionSuccess {
    @ApiProperty()
    status: string;

    @ApiProperty()
    avantage: {
        percent: number
    }
}

export class RequestPromotionFailed {

    @ApiProperty()
    status: string;

    @ApiProperty()
    reasons: {
        meteo?: string;
        age?: string;
        temp?: string;
        promotionCode?: string
    }
}
