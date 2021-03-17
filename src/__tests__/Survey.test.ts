import request from 'supertest';
import { getConnection } from 'typeorm';
import { connectDb } from '../database';
import { start } from '../start';


describe("Users", () => {
    beforeAll(async () => {
        const connection = await connectDb();
        await connection.runMigrations();
    });

    afterAll(async () => {
        const connection = getConnection();
        await connection.dropDatabase();
        await connection.close();
    })

    it("Should be able to create a new survey", async () => {
        const response = await request(start).post("/surveys").send({
            title: "New Title",
            description: "New Description"
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
    });

    it("Should be able to to get all surveys ", async () => {
        await request(start).post("/surveys").send({
            title: "New Title 2",
            description: "New Description 2"
        });

        const response = await request(start).get("/surveys");

        expect(response.body.length).toBe(2);
    });
});