export interface ValidationComposite<T> {
    validate: (input: any) => Error[];
    readonly fields: Array<keyof Partial<T>>;
}
