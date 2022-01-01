import express from "express";
import request from "supertest";
import { setupApp, setupEnvironment, setupFirebase, setupMongoDb } from "@/main/config";
let app: express.Application;
import mongoose from "mongoose";
import { ProfileModel } from "@/domain/models";
import { FirebaseAuth } from "@/infra/remote";

let createdProfile = {} as ProfileModel;
const firebaseAuth = new FirebaseAuth();
let bearerToken = "";

describe("Profiles Routes", () => {
    beforeAll(async () => {
        await setupEnvironment();
        await setupMongoDb();
        await setupFirebase();
        app = setupApp();
        jest.setTimeout(15000);
    });

    afterAll(async () => {
        firebaseAuth.delete({ authId: createdProfile.id });
    });

    describe("POST /profiles", () => {
        it("Should return 400 on missing params", async () => {
            await request(app).post("/profiles").send({ name: "Any name" }).expect(400);
        });

        it("Should return 201 on created success", async () => {
            const response = await request(app)
                .post("/profiles")
                .send({
                    description: "any_description",
                    name: "any_name",
                    username: "any_username",
                    email: "any@valid.com",
                    password: "14121241",
                })
                .expect(201);
            createdProfile = response.body;
            const credentials = await firebaseAuth.generateToken({ authId: createdProfile.id });
            bearerToken = credentials.token;
        });
    });

    describe("GET /profiles/:profileId", () => {
        it("Should return ok 200 for existant profielId. The returned id in body needs to be the same to the sent in the request", async () => {
            const response = await request(app).get(`/profiles/${createdProfile.id}`).auth(bearerToken, { type: "bearer" }).expect(200);
            expect(response.body.id).toBe(createdProfile.id);
        });

        it("Should return 400 on invalid given profileId", async () => {
            await request(app).get("/profiles/any_profile_id").set("Authorization", bearerToken).expect(400);
        });

        it("Should return 404 on profileId not found", async () => {
            await request(app).get(`/profiles/${new mongoose.Types.ObjectId()}`).set("Authorization", bearerToken).expect(404);
        });
    });
});
