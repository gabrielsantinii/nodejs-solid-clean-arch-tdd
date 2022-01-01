import faker from "faker";
import { InvalidLengthError, InvalidParamError, MissingParamError } from "@/presentation/errors";
import { AddProfileValidation } from "@/validation/usecases";

describe("add-account-validation.spec usecase", () => {
    it("should return an array of errors with incomplete input", () => {
        const sut = new AddProfileValidation();
        const errors = sut.validate({ name: faker.random.word() });
        expect(errors.length).toBeGreaterThan(0);
        expect(errors.some((e) => !e.message)).toBeFalsy();
        expect(errors).toContainEqual(new MissingParamError("username"));
    });

    it("should return an empty array on given complete input", () => {
        const sut = new AddProfileValidation();
        const errors = sut.validate({ name: "Any name", username: "any_valid_username", email: "any@foo.com", password: "213asds" });
        expect(errors).toHaveLength(0);
    });

    it("should return an array of error in username", () => {
        const sut = new AddProfileValidation();
        const errors = sut.validate({ name: "Any name", username: "invalid@username", email: "any@foo.com", password: "213asdas" });
        expect(errors).toHaveLength(1);
        expect(errors).toContainEqual(new InvalidParamError("username"));
    });

    it("should return an array of error that contains password for invalid length", () => {
        const sut = new AddProfileValidation();
        const errors = sut.validate({ name: "Any name", username: "any_username", email: "any@foo.com", password: "213" });
        expect(errors).toHaveLength(1);
        expect(errors).toContainEqual(new InvalidLengthError({ found: 3, paramName: "password", max: 45, min: 6 }));
    });
});
