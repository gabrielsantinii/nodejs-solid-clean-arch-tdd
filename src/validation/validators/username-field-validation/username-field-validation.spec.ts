import { InvalidParamError } from "@/presentation/errors";
import { UsernameFieldValidation } from "@/validation/validators";

describe("username-field-validation.spec usecase", () => {
    it("should return error for username that inits with '.'", async () => {
        const sut = new UsernameFieldValidation("username");
        const error = sut.validate({ username: ".aa.com" });
        expect(error).toEqual(new InvalidParamError("username"));
    });

    it("should return error for username that inits with '_'", async () => {
        const sut = new UsernameFieldValidation("username");
        const error = sut.validate({ username: "_aa.com" });
        expect(error).toEqual(new InvalidParamError("username"));
    });

    it("should return error for username that has two '_' in sequence", async () => {
        const sut = new UsernameFieldValidation("username");
        const error = sut.validate({ username: "aa__com" });
        expect(error).toEqual(new InvalidParamError("username"));
    });

    it("should return error for username that contains '@'", async () => {
        const sut = new UsernameFieldValidation("username");
        const error = sut.validate({ username: "aa@com" });
        expect(error).toEqual(new InvalidParamError("username"));
    });

    it("should return undefined for correctly username", async () => {
        const sut = new UsernameFieldValidation("username");
        const error = sut.validate({ username: "aaaacom" });
        expect(error).toBeUndefined();
    });

    it("should return undefined for correctly username with _", async () => {
        const sut = new UsernameFieldValidation("username");
        const error = sut.validate({ username: "aaa_com" });
        expect(error).toBeUndefined();
    });

    it("should return undefined for correctly username accent 'é'", async () => {
        const sut = new UsernameFieldValidation("username");
        const error = sut.validate({ username: "aaaé_com" });
        expect(error).toBeUndefined();
    });
});
