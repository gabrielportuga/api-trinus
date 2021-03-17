import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateActivity1615993732895 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "activity",
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
                        name: "trip_id",
                        type: "integer",
                    },
                    {
                        name: "activity_type",
                        type: "integer"
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "address",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "all_day",
                        type: "boolean",
                        default: false
                    },
                    {
                        name: "start_hour",
                        type: "time",
                    },
                    {
                        name: "end_hour",
                        type: "time",
                    },
                    {
                        name: "website",
                        type: "varchar",
                        isNullable: true
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
                        name: "FKTrip",
                        referencedTableName: "trip",
                        referencedColumnNames: ["id"],
                        columnNames: ["trip_id"]
                    },
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("activity");
    }
}
