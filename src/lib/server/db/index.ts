import 'dotenv/config'
import postgres from 'postgres';
import * as schema from './schema';
import { drizzle } from "drizzle-orm/postgres-js";

const queryClient = postgres(process.env.DATABASE_URL as string);

export const db = drizzle(queryClient, { schema });
