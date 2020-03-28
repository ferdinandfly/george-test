import {Column} from "typeorm";

export class AvantageInterface {
    @Column()
    percent: number;
}
