import { CustomParamError } from "@/presentation/errors";
import { httpResponse } from "@/presentation/helpers";
import { Controller, HttpResponse } from "@/presentation/protocols";

class LoadProfileWithPostsController implements Controller {
    async handle(request: any): Promise<HttpResponse> {
        return httpResponse.badRequest([new CustomParamError(`Profile with id ${request.profileId} not found.`)]);
    }
}

describe("load-profile-with-posts-controller.spec usecase", () => {
    it("should return badRequest for non-existing profile.", async () => {
        const sut = new LoadProfileWithPostsController();
        const controllerResponse = await sut.handle({ profileId: 'any_prof_id' })
        expect(controllerResponse.statusCode).toBe(400)
        expect(controllerResponse).toEqual(httpResponse.badRequest([new CustomParamError(`Profile with id any_prof_id not found.`)]))
    });
});
