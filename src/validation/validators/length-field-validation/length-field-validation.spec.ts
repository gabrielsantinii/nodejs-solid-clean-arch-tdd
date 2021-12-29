import { InvalidLengthError } from "@/presentation/errors";
import { Validation } from "@/presentation/protocols";

class LengthFieldValidation implements Validation {
    fieldName: string;
    max: number;
    min: number;
    constructor({ fieldName, max, min }: LengthFieldValidation.Params) {
        this.fieldName = fieldName;
        this.max = max;
        this.min = min;
    }

    validate(input: unknown = {}): Error | undefined {
        console.log("Found length: ", String(input[this.fieldName]).length);
        const validMin = this.validateMin(input);
        const validMax = this.validateMax(input);

        if (!validMin || !validMax) {
            return new InvalidLengthError({
                found: input[this.fieldName]?.length || 0,
                paramName: this.fieldName,
                min: this.min,
                max: this.max,
            });
        }
        return;
    }

    private validateMax(input: unknown) {
        if (!this?.max) return true;

        const lessThanMax = this.max >= String(input[this.fieldName]).length;
        return lessThanMax;
    }

    private validateMin(input: unknown): boolean {
        if (!this?.min) return true;
        const greaterThanMin = this.min < String(input[this.fieldName]).length;
        return greaterThanMin;
    }
}

export namespace LengthFieldValidation {
    export type Params = {
        fieldName: string;
        min?: number;
        max?: number;
    };
}

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
});
