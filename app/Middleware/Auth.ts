import { Exception } from '@adonisjs/core/build/standalone'

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

/**
 * Auth middleware is meant to restrict un-authenticated access to a given route
 * or a group of routes.
 *
 * You must register this middleware inside `start/kernel.ts` file under the list
 * of named middleware.
 */
export default class AuthMiddleware {
  protected async authenticate(auth: HttpContextContract['auth']) {
    const guard = 'api'
    if (await auth.use(guard).check()) {
      const tokenName = await auth.use(guard).token?.name
      if (tokenName === 'login') {
        auth.defaultGuard = guard
        return true
      }
    }
    throw new Exception('', 401, 'UNAUTHORIZED_ACCESS')
  }

  /**
   * Handle request
   */
  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>) {
    try {
      await this.authenticate(auth)
      await next()
    } catch (err: any) {
      let status = 500
      let failure: any = { code: 'UNKNOWN' }
      switch (err.code) {
        case 'UNAUTHORIZED_ACCESS':
          status = 401
          failure.code = 'UNAUTHORIZED_ACCESS'
          break
        default:
          console.error(err)
          break
      }
      return response.status(status).send(failure)
    }
  }
}
