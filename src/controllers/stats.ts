import { Request, Response } from "express";
import { prisma } from "../prisma.js";

export async function overview(req: Request, res: Response) {
  const userId = (req as any).userId as string;

  const [totalSessions, totalSets, latestSession] = await Promise.all([
    prisma.workoutSession.count({ where: { userId } }),
    prisma.sessionSet.count({ where: { session: { userId } } }),
    prisma.workoutSession.findFirst({
      where: { userId },
      orderBy: { date: "desc" },
    }),
  ]);

  res.json({
    totalSessions,
    totalSets,
    lastWorkoutAt: latestSession?.date ?? null,
  });
}
