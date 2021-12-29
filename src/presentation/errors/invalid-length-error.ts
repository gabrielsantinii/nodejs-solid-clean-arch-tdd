export class InvalidLengthError extends Error {
    constructor({ paramName, min, max, found }: InvalidLengthError.Params) {
        let errorMessage = `Invalid length for ${paramName}. `;
        if (min) errorMessage += `Min: ${min}. `;
        if (max) errorMessage += `Max: ${max}. `;
        errorMessage += `Found: ${found}`;
        super(errorMessage);
        this.name = "InvalidLengthError";
    }
}

export namespace InvalidLengthError {
    export type Params = {
        paramName: string;
        min?: number;
        max?: number;
        found: number;
    };
}
