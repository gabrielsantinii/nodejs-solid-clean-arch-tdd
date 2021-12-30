import { IdValidator } from "@/validation/protocols";
import { isValidObjectId } from "mongoose";

export class IdValidatorAdapter implements IdValidator {
    isValid(value: string): boolean {
        return isValidObjectId(value);
    }
}
