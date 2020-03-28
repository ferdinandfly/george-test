import {Column} from "typeorm";

export class EqualAgeRestriction {
    @Column()
    eq: number;
}

export class IntervalAgeRestriction {
    @Column()
    lt: number;

    @Column()
    gt: number;
}

export class DateRestriction {
    @Column()
    after: string;

    @Column()
    before: string;
}

export class TemperatureInterval {
    @Column()
    gt?: number;
    @Column()
    lt?: number;
}

export class MeteoRestriction {
    @Column()
    is?: 'clear' | 'cloudy' | 'rainy' | 'anythingElse';
    @Column()
    temp?: TemperatureInterval;
}

export class RestrictionInterface {
    @Column()
    or?: Array<RestrictionInterface>;

    @Column()
    meteo?: MeteoRestriction;

    @Column()
    date?: DateRestriction;

    @Column()
    age?: EqualAgeRestriction | IntervalAgeRestriction;
}
