import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Activity } from "./Activity";
import { User } from "./User";

@Entity("trip")
class Trip {

    @PrimaryGeneratedColumn('increment')
    id: Number;

    @Column()
    user_id: Number;

    @Column()
    name: string;

    @Column()
    country: string;

    @Column()
    start_date: Date;

    @Column()
    end_date: Date;

    @Column({nullable: true})
    note: string;

    @Column({nullable: true})
    expected_expense: Number;

    @Column({nullable: true})
    effective_expense: Number;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(() => User, user => user.trips)
    @JoinColumn({ name: "user_id" })
    user: User;

    @OneToMany(() => Activity, activity => activity.trip)
    @JoinColumn({ name: "id" })
    activities: Activity[];
}

export { Trip };
