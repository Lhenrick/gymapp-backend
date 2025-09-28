import { Request, Response } from "express";
import { prisma } from "../prisma.js";

export async function createPlan(req: Request, res: Response) {
  const userId = (req as any).userId as string;
  const { title, focus, days } = req.body;

  const plan = await prisma.workoutPlan.create({
    data: {
      title,
      focus,
      userId,
      days: {
        create: days.map((d: any) => ({
          label: d.label,
          notes: d.notes,
          items: {
            create: d.items.map((it: any) => ({
              exerciseId: it.exerciseId,
              order: it.order,
              targetSets: it.targetSets,
              targetReps: it.targetReps,
              targetRpe: it.targetRpe,
            })),
          },
        })),
      },
    },
    include: { days: { include: { items: true } } },
  });

  res.status(201).json(plan);
}

export async function myPlans(req: Request, res: Response) {
  const userId = (req as any).userId as string;
  const plans = await prisma.workoutPlan.findMany({
    where: { userId },
    include: { days: { include: { items: { include: { exercise: true } } } } },
    orderBy: { createdAt: "desc" },
  });
  res.json(plans);
}

export async function deletePlan(req: Request, res: Response) {
  const userId = (req as any).userId as string;
  const { id } = req.params;
  const plan = await prisma.workoutPlan.findUnique({ where: { id } });
  if (!plan || plan.userId !== userId)
    return res.status(404).json({ error: "Not found" });
  await prisma.workoutPlan.delete({ where: { id } });
  res.json({ ok: true });
}
