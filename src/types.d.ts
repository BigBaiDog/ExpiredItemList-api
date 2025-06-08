import { drizzle } from "drizzle-orm/mysql2"

export interface Env {
  HYPERDRIVE: Hyperdrive;
  EMAIL_ROBOT: string;
  EMAIL_AUTH_CODE: string;
}
export interface HYPERDRIVE {
  host: string;
  user: string;
  password: string;
  database: string;
  port: number;
}

export interface CustomVariables {
  Variables: {
    databaseInstance: ReturnType<typeof drizzle>
  }
}