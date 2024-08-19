import 'dotenv/config';
import * as schema from './schema';
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import pg from "pg";

let isConnected = false;
let connecting = false;
let db: NodePgDatabase<typeof schema>;

const createClient = () => {
  return new pg.Client({
    connectionString: process.env.DATABASE_URL,
    connectionTimeoutMillis: 5000,
    statement_timeout: 5000,
    query_timeout: 5000,
  });
};


const connect = async () => {
  if (connecting) return;
  connecting = true;

  const client = createClient();

  client.on('error', (error) => {
    isConnected = false;
    console.log("[PostgreSQL] Connection Error", error);
    if (!connecting) {
      setTimeout(connect, 5000);
    }
  });

  console.log("[PostgreSQL] Connecting to Database");
  try {
    await client.connect();
    isConnected = true;
    console.log("[PostgreSQL] Connected to Database");
    db = drizzle(client, { schema });
  } catch (error) {
    isConnected = false;
    console.log(`[PostgreSQL] Connection Error: ${process.env.DATABASE_URL}`, error);
    setTimeout(connect, 5000);
  } finally {
    connecting = false;
  }
};

await connect();

export { db, isConnected };
