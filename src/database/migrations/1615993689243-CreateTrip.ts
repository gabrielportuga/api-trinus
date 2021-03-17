import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTrip1615993689243 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "trip",
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
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "country",
                        type: "varchar",
                    },
                    {
                        name: "start_date",
                        type: "date",
                    },
                    {
                        name: "end_date",
                        type: "date",
                    },
                    {
                        name: "note",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "expected_expense",
                        type: "money",
                        isNullable: true
                    },
                    {
                        name: "effective_expense",
                        type: "money",
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
                        name: "FKTraveler",
                        referencedTableName: "traveler",
                        referencedColumnNames: ["id"],
                        columnNames: ["user_id"]
                    },
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("trip");
    }

}
