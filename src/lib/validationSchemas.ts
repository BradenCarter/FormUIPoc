import { z } from 'zod';

export const StepOneSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  dob: z.string().min(1, "Date of birth is required"),
  email: z.string().email("Invalid email address"),
  contactNumber: z.string().min(1, "Contact number is required"),
});

export type StepOneData = z.infer<typeof StepOneSchema>;

export const StepTwoSchema = z.object({
  dueDate: z.string().min(1, "Due date is required"),
  trimester: z.string().min(1, "Trimester selection is required"),
  firstPregnancy: z.boolean(),
  healthConcerns: z.string().optional(),
});

export type StepTwoData = z.infer<typeof StepTwoSchema>;

export const StepThreeSchema = z.object({
  memberId: z.string().min(1, "Member ID is required"),
  planType: z.string().min(1, "Plan type is required"),
  physicianName: z.string().min(1, "Physician name is required"),
});

export type StepThreeData = z.infer<typeof StepThreeSchema>;

export const FinalStepSchema = z.object({
  consent: z.boolean()
    .refine(val => val === true, {
      message: "You must consent to submit this form"
    })
});

export type FinalStepData = z.infer<typeof FinalStepSchema>;
