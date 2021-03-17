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

    it("Should be able to create a new user", async () => {
        const response = await request(start).post("/users").send({
            email: "user@exemple.com",
            name: "User Example"
        });

        expect(response.status).toBe(201);
    });

    it("Should be able to create a new user with exists email ", async () => {
        const response = await request(start).post("/users").send({
            email: "user@exemple.com",
            name: "User Example"
        });

        expect(response.status).toBe(400);
    });
});