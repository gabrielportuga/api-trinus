import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Trip } from "./Trip";

@Entity("activity")
class Activity {

    @PrimaryGeneratedColumn("increment")
    id: Number;

    @Column({name: "trip_id"})
    tripId: Number;

    @Column({name: "activity_type"})
    activityType: Number;

    @Column()
    name: string;

    @Column({nullable: true})
    address: string;

    @Column({name: "all_day"})
    allDay: Boolean;

    @Column({name: "start_hour"})
    startHour: Date;

    @Column({name: "end_hour"})
    endHour: Date;

    @Column({nullable: true})
    website: string;
    
    @Column({nullable: true})
    note: string;

    @Column({name: "expected_expense", nullable: true})
    expectedExpense: Number;

    @Column({name: "effective_expense", nullable: true})
    effectiveExpense: Number;

    @CreateDateColumn({name: "created_at"})
    createdAt: Date;

    @ManyToOne(() => Trip)
    @JoinColumn({ name: "trip_id" })
    trip: Trip;
}

export { Activity };
