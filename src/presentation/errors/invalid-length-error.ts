type InvalidLengthParams = {
    paramName: string;
    min?: number;
    max?: number;
    found: number;
};

export class InvalidLengthError extends Error {
    constructor({ paramName, min, max, found }: InvalidLengthParams) {
        let errorMessage = `Invalid length for ${paramName}. `;
        if (min) errorMessage += `Min: ${min}. `;
        if (max) errorMessage += `Max: ${max}. `;
        errorMessage += `Found: ${found}`;
        super(errorMessage);
        this.name = "InvalidLengthError";
    }
}
