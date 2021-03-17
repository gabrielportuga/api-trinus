import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Trip } from "./Trip";

@Entity("activity")
class Activity {

    @PrimaryGeneratedColumn('increment')
    id: Number;

    @Column()
    trip_id: Number;

    @Column()
    activity_type: Number;

    @Column()
    name: string;

    @Column({nullable: true})
    address: string;

    @Column()
    all_day: Boolean;

    @Column()
    start_hour: Date;

    @Column()
    end_hour: Date;

    @Column({nullable: true})
    website: string;
    
    @Column({nullable: true})
    note: string;

    @Column({nullable: true})
    expected_expense: Number;

    @Column({nullable: true})
    effective_expense: Number;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(() => Trip, trip => trip.activities)
    @JoinColumn({ name: "trip_id" })
    trip: Trip;
}

export { Activity };
