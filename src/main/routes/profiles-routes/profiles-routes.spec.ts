import express from "express";
import request from "supertest";
import { setupApp } from "@/main/config";
let app: express.Application;

describe("Profiles Routes", () => {
    beforeAll(async () => {
        app = setupApp();
    });

    describe("POST /profiles", () => {
        it("Should return 400 on missing params", async () => {
            await request(app).post("/profiles").send({ name: "Any name" }).expect(400);
        });

        it("Should return 201 on created success", async () => {
            await request(app)
                .post("/profiles")
                .send({ description: "any_description", name: "any_name", username: "any_username", email: "any_email", password: "1412" })
                .expect(201);
        });
    });

    describe("GET /profiles/:profileId", () => {
        it("Should return 400 on profile not found", async () => {
            await request(app).get("/profiles/any_profile_id").expect(400);
        });
    });
});
