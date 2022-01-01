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
        const fieldValue = String(input[this.fieldName]);
        const validMin = this.validateMin(fieldValue);
        const validMax = this.validateMax(fieldValue);

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

    private validateMax(fieldValue: string) {
        if (!this?.max) return true;

        const lessThanMax = this.max >= fieldValue.length;
        return lessThanMax;
    }

    private validateMin(fieldValue: string): boolean {
        if (!this?.min) return true;
        const greaterThanMin = this.min <= fieldValue.length;
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
