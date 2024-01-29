import { getServerSession } from '#auth'
export default defineEventHandler(async (event) => {

  if ((new RegExp(`/api/`).test(getRequestURL(event).toString()))) {
    const open: string[] = ['register', 'auth', 'login']

    if ((new RegExp(`/api/(${open.join('|')})`).test(getRequestURL(event).toString()))) return

    const session = await getServerSession(event)
    if (!session) {
      throw createError({ statusMessage: 'Unauthenticated', statusCode: 403 })
    }
  }
})