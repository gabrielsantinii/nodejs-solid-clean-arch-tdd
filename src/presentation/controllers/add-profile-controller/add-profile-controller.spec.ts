class AddProfileController {}

describe('add-profile-controller.spec usecase', () => {
    it('should return created response (201) for successful add profile', async () => {
        const sut = new AddProfileController()
        expect(sut).toBeDefined()
    })
})