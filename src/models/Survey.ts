import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("survey")
class Survey {

    @PrimaryGeneratedColumn('increment')
    id: Number;

    @Column()
    title: string;

    @Column()
    description: string;

    @CreateDateColumn()
    created_at: Date;
}

export { Survey };
