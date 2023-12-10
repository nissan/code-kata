import { z } from 'zod';

export const BusinessDetailsSchema = z.object({
  name: z.string().min(1, "Business name is required."),
  yearEstablished: z.number().min(1900, "Year must be after 1900.").max(new Date().getFullYear(), "Year cannot be in the future."),
  loanAmount: z.number().positive("Loan amount must be positive."),
});

export type BusinessDetails = z.infer<typeof BusinessDetailsSchema>;
