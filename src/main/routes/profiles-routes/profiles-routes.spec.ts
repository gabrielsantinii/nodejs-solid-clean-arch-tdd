import express from "express";
import request from "supertest";
import { setupApp, setupEnvironment, setupMongoDb } from "@/main/config";
let app: express.Application;
import mongoose from "mongoose";

describe("Profiles Routes", () => {
    beforeAll(async () => {
        await setupEnvironment();
        await setupMongoDb();
        app = setupApp();
    });

    describe("POST /profiles", () => {
        it("Should return 400 on missing params", async () => {
            await request(app).post("/profiles").send({ name: "Any name" }).expect(400);
        });

        it("Should return 201 on created success", async () => {
            await request(app)
                .post("/profiles")
                .send({ description: "any_description", name: "any_name", username: "any_username", email: "any@valid.com", password: "1412" })
                .expect(201);
        });
    });

    describe("GET /profiles/:profileId", () => {
        it("Should return 400 on invalid given profileId", async () => {
            await request(app).get("/profiles/any_profile_id").expect(400);
        });

        it("Should return 404 on profileId not found", async () => {
            
            await request(app)
                .get(`/profiles/${new mongoose.Types.ObjectId()}`)
                .expect(404);
        });
    });
});
