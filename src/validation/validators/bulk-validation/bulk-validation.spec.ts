import { BulkValidation } from "@/validation/validators";

describe("bulk-validation.spec usecase", () => {
    it("should return an array of errors.", async () => {
        const sut = new BulkValidation(["any_field1", "any_field2"]);
        const errors = sut.validateRequired({ any_field1: "filled successfully" });
        expect(errors.length).toBe(1);
    });
});
