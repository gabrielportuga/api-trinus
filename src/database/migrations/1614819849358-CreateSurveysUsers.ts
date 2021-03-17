import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSurveysUsers1614819849358 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "survey_user",
                columns: [
                    {
                        name: "id",
                        type: "integer",
                        unsigned: true,
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: "user_id",
                        type: "integer"
                    },
                    {
                        name: "survey_id",
                        type: "integer"
                    },
                    {
                        name: "value",
                        type: "integer",
                        isNullable: true
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                ],
                foreignKeys: [
                    {
                        name: "FKUser",
                        referencedTableName: "user",
                        referencedColumnNames: ["id"],
                        columnNames: ["user_id"]
                    },
                    {
                        name: "FKSurvey",
                        referencedTableName: "survey",
                        referencedColumnNames: ["id"],
                        columnNames: ["survey_id"]
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("survey_user");
    }

}
