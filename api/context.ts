import { db } from "./db";
import { Prisma, PrismaClient } from "@prisma/client";

export interface Context {
  db: PrismaClient;
}

export const context = {
  db,
};
