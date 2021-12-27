import faker from "faker";
import { MissingParamError } from "@/presentation/errors";
import { mockProfileModel } from "@/tests/domain/mocks";
import { AddAccountValidation } from "./add-account-validation";

describe("add-account-validation.spec usecase", () => {
    it("should return an array of errors with incomplete input", () => {
        const sut = new AddAccountValidation();
        const errors = sut.validate({ name: faker.random.word() });
        expect(errors.length).toBeGreaterThan(0);
        expect(errors.some((e) => !e.message)).toBeFalsy();
        expect(errors).toContainEqual(new MissingParamError("username"));
    });

    it("should return an empty array on given complete input", () => {
        const sut = new AddAccountValidation();
        const errors = sut.validate({ ...mockProfileModel(), password: "213" });
        expect(errors).toHaveLength(0);
    });
});
