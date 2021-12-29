import { InvalidLengthError } from "@/presentation/errors";
import { Validation } from "@/presentation/protocols";

export class LengthFieldValidation implements Validation {
    fieldName: string;
    max: number;
    min: number;
    constructor({ fieldName, max, min }: LengthFieldValidation.Params) {
        this.fieldName = fieldName;
        this.max = max;
        this.min = min;
    }

    validate(input: unknown = {}): Error | undefined {
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
        const greaterThanMin = this.min <= String(input[this.fieldName]).length;
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
