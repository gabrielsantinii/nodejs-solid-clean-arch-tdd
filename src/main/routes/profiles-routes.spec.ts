import express from "express";
import request from "supertest";
import mongoose from "mongoose";
import { setupApp, setupEnvironment, setupFirebase, setupMongoDb } from "@/main/config";
import { ProfileModel } from "@/domain/models";
import { FirebaseAuth } from "@/infra/remote";
import { FirebaseHelper } from "@/tests/infra/remote";

let app: express.Application;
let createdProfile: ProfileModel;
let bearerToken: string;
let firebaseAuth: FirebaseAuth;

describe("Profiles Routes", () => {
    beforeAll(async () => {
        await setupEnvironment();
        await setupMongoDb();
        await setupFirebase();
        app = setupApp();
        firebaseAuth = new FirebaseAuth();
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
            const credentials = await firebaseAuth.generateCustomToken({ authId: createdProfile.id });
            const tokenResult = await FirebaseHelper.generateTokenId(credentials.token);
            bearerToken = tokenResult.tokenId;
        });
    });

    describe("GET /profiles/:profileId", () => {
        it("Should return ok 200 for existant profielId. The returned id in body needs to be the same to the sent in the request", async () => {
            const response = await request(app).get(`/profiles/${createdProfile.id}`).auth(bearerToken, { type: "bearer" }).expect(200);
            expect(response.body.id).toBe(createdProfile.id);
        });

        it("Should return 400 on invalid given profileId", async () => {
            await request(app).get("/profiles/any_profile_id").auth(bearerToken, { type: "bearer" }).expect(400);
        });

        it("Should return 404 on profileId not found", async () => {
            await request(app).get(`/profiles/${new mongoose.Types.ObjectId()}`).auth(bearerToken, { type: "bearer" }).expect(404);
        });

        it("Should return 401 on unauthed request", async () => {
            await request(app).get(`/profiles/${new mongoose.Types.ObjectId()}`).expect(401);
        });
    });
});
