import { defineConfig, type Config } from 'drizzle-kit';
import 'dotenv/config';

export default defineConfig({
  dialect: "postgresql",
  schema: './src/lib/server/db/schema.ts',
  dbCredentials: {
    url: process.env.DATABASE_URL ?? ''
  },
  migrations: {
    table: "migrations",
    schema: "public"
  }
});