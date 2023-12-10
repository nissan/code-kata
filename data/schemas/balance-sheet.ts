import { z } from 'zod';

export const BalanceSheetEntrySchema = z.object({
    year: z.number(),
    month: z.number().min(1).max(12),
    profitOrLoss: z.number(),
    assetsValue: z.number().positive("Assets value must be positive.")
  });
  
  export const BalanceSheetSchema = z.array(BalanceSheetEntrySchema);
  
  export type BalanceSheet = z.infer<typeof BalanceSheetSchema>;