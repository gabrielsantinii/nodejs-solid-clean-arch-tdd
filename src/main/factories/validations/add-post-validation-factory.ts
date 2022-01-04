import { AddPostController } from "@/presentation/controllers";
import { CompositeValidation } from "@/presentation/protocols";
import { AddPostValidation } from "@/validation/usecases";

export const makeAddPostValidation = (): CompositeValidation<AddPostController.Request> => { 
    return new AddPostValidation()
}