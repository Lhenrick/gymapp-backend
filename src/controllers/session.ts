import { Request, Response } from 'express';
import { prisma } from '../prisma';

export async function createSession(req: Request, res: Response) {
  const userId = (req as any).userId as string;
  const { date, notes } = req.body;
  const session = await prisma.workoutSession.create({
    data: { userId, date: date ? new Date(date) : undefined, notes }
  });
  res.status(201).json(session);
}

export async function addSet(req: Request, res: Response) {
  const userId = (req as any).userId as string;
  const { sessionId } = req.params;
  const session = await prisma.workoutSession.findUnique({ where: { id: sessionId } });
  if (!session || session.userId !== userId) return res.status(404).json({ error: 'Session not found' });

  const { workoutItemId, setNumber, reps, weight, rpe } = req.body;

  const set = await prisma.sessionSet.create({
    data: { sessionId, workoutItemId, setNumber, reps, weight, rpe }
  });

  res.status(201).json(set);
}

export async function mySessions(req: Request, res: Response) {
  const userId = (req as any).userId as string;
  const sessions = await prisma.workoutSession.findMany({
    where: { userId },
    include: { sets: { include: { workoutItem: { include: { exercise: true, day: { include: { plan: true } } } } } } },
    orderBy: { date: 'desc' }
  });
  res.json(sessions);
}
