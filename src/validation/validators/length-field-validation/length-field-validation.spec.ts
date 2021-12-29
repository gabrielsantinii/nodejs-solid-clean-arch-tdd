import { LengthFieldValidation } from "@/validation/validators";


const mockFieldValidation = (): LengthFieldValidation.Params => ({ fieldName: "username", max: 10, min: 0 });

describe("length-field-validation.spec usecase", () => {
    it("should return error if undefined.", async () => {
        const sut = new LengthFieldValidation(mockFieldValidation());
        const error = sut.validate({});
        expect(error).toBeFalsy();
    });

    it("should not return error if the length is valid", async () => {
        const sut = new LengthFieldValidation(mockFieldValidation());
        const error = sut.validate({ username: "hello there" });
        expect(error).toBeTruthy();
    });

    it("should return error for length greater than max length", async () => {
        const sut = new LengthFieldValidation(mockFieldValidation());
        const error = sut.validate({ username: "hello there1" });
        expect(error).toBeTruthy();
    });

    it("should return error for length less than min length", async () => {
        const sut = new LengthFieldValidation({ min: 10, max: 20, fieldName: "username" });
        const error = sut.validate({ username: "hello" });
        expect(error).toBeTruthy();
    });
});
