import { z } from 'zod';

export const timestamps_schema = z.object({
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
