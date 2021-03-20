import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Trip } from "./Trip";

@Entity("traveler")
class User {

    @PrimaryGeneratedColumn("increment")
    id: Number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({name: "photo_url", nullable: true})
    photoUrl: string;

    @Column({name: "access_type", default: 1})
    accessType: string;

    @CreateDateColumn({name: "created_at"})
    createdAt: Date;

    @OneToMany(() => Trip, trip => trip.user)
    @JoinColumn({ name: "id" })
    trips: Trip[];
}

export { User };
