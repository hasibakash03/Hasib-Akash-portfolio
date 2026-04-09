import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

function getDb() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    // Return a proxy that throws a readable error at call time, not import time
    return new Proxy({} as ReturnType<typeof drizzle>, {
      get: () => () => { throw new Error("DATABASE_URL not set. Add it to your environment variables."); },
    });
  }
  const sql = neon(url);
  return drizzle(sql, { schema });
}

export const db = getDb();
export * from "./schema";
