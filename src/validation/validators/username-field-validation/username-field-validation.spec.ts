import { InvalidParamError } from "@/presentation/errors";
import { Validation } from "@/presentation/protocols";

class UsernameFieldValidation implements Validation {
    private readonly transformations: Array<(v: string) => string> = [
        (v) => v.toLowerCase(),
        // Remove all accents
        (v) => v.normalize("NFD").replace(/\p{Diacritic}/gu, ""),
    ];
    private readonly validations: Array<(v: string) => boolean> = [
        // Only alphanumeric characters
        (v) => !!v.match(/^[a-z0-9_]/g),
        (v) => v[0] !== "_",
        (v) => !v.includes("__"),
        (v) => !v.includes("@"),
    ];
    constructor(private readonly fieldName: string) {}

    validate(input: any): Error {
        const usernameToValidate = input[this.fieldName];
        let transformedUsername = String(usernameToValidate);
        for (const transformation of this.transformations) {
            transformedUsername = transformation(transformedUsername);
        }
        for (const validation of this.validations) {
            if (!validation(transformedUsername)) {
                return new InvalidParamError(this.fieldName);
            }
        }
    }
}

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
