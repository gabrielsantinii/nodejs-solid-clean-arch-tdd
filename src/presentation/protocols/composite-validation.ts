export interface CompositeValidation<T> {
    validate: (input: any) => Error[];
    readonly fields: Array<keyof Partial<T>>;
}
