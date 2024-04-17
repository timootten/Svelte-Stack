import postgres from 'postgres';
import * as schema from './schema';
import { drizzle } from "drizzle-orm/postgres-js";

const queryClient = postgres(process.env.DATABASE_URL || "");

export const db = drizzle(queryClient, { schema });
