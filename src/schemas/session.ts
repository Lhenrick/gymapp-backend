import { z } from 'zod';

export const createSessionSchema = z.object({
  date: z.string().datetime().optional(),
  notes: z.string().optional()
});

export const addSetSchema = z.object({
  workoutItemId: z.string(),
  setNumber: z.number().int().min(1),
  reps: z.number().int().min(1),
  weight: z.number().min(0),
  rpe: z.number().min(1).max(10).optional(),
});
