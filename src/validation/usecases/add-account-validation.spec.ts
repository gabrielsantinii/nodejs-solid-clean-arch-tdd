import { AddProfile } from "@/domain/usecases";
import { ValidationComposite } from "@/validation/protocols";
import { RequiredFieldValidation } from "@/validation/validators";
import faker from "faker";

class AddAccountValidation implements ValidationComposite<AddProfile.Params> {
    readonly fields: Array<keyof Partial<AddProfile.Params>> = ["name", "username", "email", "password"];

    validate(input: any): Error[] {
        let errors: Error[] = [];
        this.fields.forEach((field) => {
            const fieldError = new RequiredFieldValidation(field).validate(input);
            if (fieldError) errors.push(fieldError);
        });

        return errors;
    }
}

describe("add-account-validation.spec usecase", () => {
    it("should return an array of errors", async () => {
        const sut = new AddAccountValidation();
        const errors = sut.validate({ email: faker.random.word() });
        expect(errors.length).toBeGreaterThan(0);
        expect(errors.some(e => !e.message)).toBeFalsy()
    });
});
