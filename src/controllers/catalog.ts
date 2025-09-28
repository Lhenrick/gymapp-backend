import { Request, Response } from 'express';
import { prisma } from '../prisma';

export async function listMuscles(_req: Request, res: Response) {
  const muscles = await prisma.muscle.findMany({ orderBy: { name: 'asc' } });
  res.json(muscles);
}

export async function listExercises(req: Request, res: Response) {
  const muscle = req.query.muscle as string | undefined;
  const where = muscle ? { muscle: { slug: muscle } } : {};
  const exercises = await prisma.exercise.findMany({
    where,
    include: { muscle: true },
    orderBy: { name: 'asc' },
  });
  res.json(exercises);
}
