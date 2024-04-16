import { DATABASE_URL } from "$env/static/private";
import postgres from 'postgres';
import * as schema from './schema';
import { drizzle } from "drizzle-orm/postgres-js";

const queryClient = postgres(DATABASE_URL || process.env.DATABASE_URL || "");

export const db = drizzle(queryClient, { schema });
