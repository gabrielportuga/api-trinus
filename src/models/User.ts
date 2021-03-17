import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Trip } from "./Trip";

@Entity("traveler")
class User {

    @PrimaryGeneratedColumn('increment')
    id: Number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @OneToMany(() => Trip, trip => trip.user)
    @JoinColumn({ name: "id" })
    trips: Trip[];
}

export { User };
