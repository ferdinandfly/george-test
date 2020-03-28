import {AvantageInterface} from "../interfaces/avantage.interface";
import {RestrictionInterface} from "../interfaces/restriction.interface";
import {IsNotEmpty} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class PromotionCodeDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    avantage: AvantageInterface;

    @ApiProperty()
    @IsNotEmpty()
    restrictions: RestrictionInterface;
}
