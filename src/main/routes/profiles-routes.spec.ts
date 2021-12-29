import express from "express";
import request from "supertest";
import { setupApp } from "@/main/config";
import { mockProfileModel } from "@/tests/domain/mocks";

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
                .send({ ...mockProfileModel(), password: "1412" })
                .expect(201);
        });
    });
});
