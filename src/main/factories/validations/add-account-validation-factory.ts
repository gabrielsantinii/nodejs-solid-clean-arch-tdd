import { CompositeValidation } from "@/presentation/protocols"
import { AddAccountValidation } from "@/validation/usecases"

export const makeAccountValidation = (): CompositeValidation<any> => {
    return new AddAccountValidation()
}