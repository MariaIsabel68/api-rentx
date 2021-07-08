import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
    UpdateDateColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { Car } from "@modules/cars/infra/typeorm/entities/Car";

@Entity("rentals")
class Rental {
    @PrimaryColumn()
    id: string;

    @ManyToOne(() => Car)
    @JoinColumn({ name: "car_id" })
    car: Car;

    @Column()
    car_id: string;

    @Column()
    user_id: string;

    @CreateDateColumn()
    start_date: Date;

    @Column({ nullable: true })
    end_date: Date;

    @Column()
    expected_return_date: Date;

    @Column({ nullable: true })
    total: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidv4();
        }
    }
}

export { Rental };
