import { z } from 'zod';

export const createPlanSchema = z.object({
  title: z.string().min(2),
  focus: z.string().optional(),
  days: z.array(z.object({
    label: z.enum(['A','B','C','D']).default('A'),
    notes: z.string().optional(),
    items: z.array(z.object({
      exerciseId: z.string(),
      order: z.number().int().min(1),
      targetSets: z.number().int().min(1).max(10).optional(),
      targetReps: z.number().int().min(1).max(50).optional(),
      targetRpe: z.number().int().min(1).max(10).optional(),
    }))
  })).min(1)
});
