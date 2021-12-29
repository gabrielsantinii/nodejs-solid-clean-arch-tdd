export class InvalidLengthError extends Error {
    constructor({ paramName, min, max, found }: InvalidLengthError.Params) {
        let errorMessage = `Invalid length for ${paramName}. `;
        if (typeof min === 'number') errorMessage += `Min: ${min}. `;
        if (typeof max === 'number') errorMessage += `Max: ${max}. `;
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
