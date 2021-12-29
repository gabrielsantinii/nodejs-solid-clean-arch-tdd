export class CustomParamError extends Error {
    constructor (customMessage: string) {
      super(customMessage)
      this.name = 'CustomParamError'
    }
  }