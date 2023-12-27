import { H3Event, EventHandlerRequest } from 'h3'
import jwt from 'jsonwebtoken'

const config = useRuntimeConfig()

export const validAuth = async (event: H3Event<EventHandlerRequest>) => {
  const token = event.node.req.headers.authorization?.replace('Bearer ', '') || ''
  try {
    jwt.verify(token, config.JWT_SECRET);
  } catch (error) {
    throw new Error("INVALID_TOKEN");
  }
}