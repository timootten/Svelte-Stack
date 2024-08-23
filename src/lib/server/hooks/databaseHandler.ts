import { error, type Handle } from '@sveltejs/kit';
import { isConnected } from '../db';

export const databaseHandler: Handle = async ({ event, resolve }) => {

  if (!isConnected)
    error(500, "Database connection error")

  return resolve(event)
}