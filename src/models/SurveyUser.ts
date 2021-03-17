import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Survey } from "./Survey";
import { User } from "./User";

@Entity("survey_user")
class SurveyUser {

    @PrimaryGeneratedColumn('increment')
    id: Number;

    @Column()
    user_id: Number;

    @Column()
    survey_id: Number;

    @Column()
    value: Number;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(() => User)
    @JoinColumn({ name: "user_id" })
    user: User;

    @ManyToOne(() => Survey)
    @JoinColumn({ name: "survey_id" })
    survey: Survey;
}

export { SurveyUser };
