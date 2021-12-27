export interface ValidationComposite<T = any> {
    validate: (input: any) => Error[];
    readonly fields: Array<keyof Partial<T>>;
}
