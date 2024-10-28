import { registerAs } from '@nestjs/config';

export declare interface Database {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export const dbConfig = registerAs<Database>(
  'database',
  (): Database => ({
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  }),
);
