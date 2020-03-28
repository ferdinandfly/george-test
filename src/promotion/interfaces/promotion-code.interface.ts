import {AvantageInterface} from "./avantage.interface";
import {RestrictionInterface} from "./restriction.interface";
import {Column, Entity, ObjectID, ObjectIdColumn} from "typeorm";

@Entity()
export class PromotionCodeInterface {

    @ObjectIdColumn()
    id: ObjectID;

    @Column({unique: true})
    name: string;

    @Column(type => AvantageInterface)
    avantage: AvantageInterface;

    @Column(type => RestrictionInterface)
    restrictions: RestrictionInterface;
}
