// lib/prisma.ts (example)
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();
// For basic use, this still works; for Accelerate or adapters, you'd pass options here
