//import { DATABASE_URL } from "$env/static/private";
import postgres from 'postgres';
import * as schema from './schema';
import { drizzle } from "drizzle-orm/postgres-js";

const queryClient = postgres("postgresql://postgres:postgres@postgres:5432/web?schema=public");

export const db = drizzle(queryClient, { schema });
