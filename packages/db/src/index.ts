import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "./generated/client/client.js";
import 'dotenv/config'

console.log(process.env.DATABASE_URL)

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

export const prismaClient=new PrismaClient({adapter});

