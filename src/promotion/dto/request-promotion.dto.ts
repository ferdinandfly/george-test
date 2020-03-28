import {IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";


export class RequestMeteoDto {
    @ApiProperty()
    is?: 'clear' | 'cloudy' | 'rainy' | 'anythingElse';
    @ApiProperty()
    temp?: number;
}

export class RequestPromotionArgumentDto {
    @ApiProperty()
    age ?: number;

    @ApiProperty()
    meteo ?: RequestMeteoDto;

    @ApiProperty()
    date ?: string;

    @ApiProperty({isArray: true, type: RequestPromotionArgumentDto, required: false})
    or ?: Array<RequestPromotionArgumentDto>
}

export class RequestPromotionDto {
    @ApiProperty()
    @IsNotEmpty()
    promocode_name: string;

    @ApiProperty()
    @IsNotEmpty()
    arguments: RequestPromotionArgumentDto;
}
