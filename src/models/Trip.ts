import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Activity } from "./Activity";
import { User } from "./User";

@Entity("trip")
class Trip {

    @PrimaryGeneratedColumn("increment")
    id: Number;

    @Column({name: "user_id"})
    userId: Number;

    @Column()
    name: string;

    @Column()
    country: string;

    @Column({name: "start_date"})
    startDate: Date;

    @Column({name: "end_date"})
    endDate: Date;

    @Column({nullable: true})
    note: string;

    @Column({name: "expected_expense", nullable: true})
    expectedExpense: Number;

    @Column({name: "effective_expense", nullable: true})
    effectiveExpense: Number;

    @CreateDateColumn({name: "created_at"})
    createdAt: Date;

    @ManyToOne(() => User)
    @JoinColumn({ name: "user_id" })
    user: User;

    @OneToMany(() => Activity, activity => activity.trip)
    @JoinColumn({ name: "id" })
    activities: Activity[];
}

export { Trip };
