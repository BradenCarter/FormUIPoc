import * as Yup from 'yup';

// Define TypeScript interfaces for our form data
export interface StepOneData {
  fullName: string;
  dob: Date;
  email: string;
  contactNumber: string;
}

export interface StepTwoData {
  dueDate: Date;
  trimester: string;
  firstPregnancy: boolean;
  healthConcerns?: string;
}

export interface StepThreeData {
  memberId: string;
  planType: string;
  physicianName: string;
}

export interface FinalStepData {
  consent: boolean;
}

export const StepOneSchema = Yup.object().shape({
  fullName: Yup.string().required('Full Name is required'),
  dob: Yup.date().required('Date of Birth is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  contactNumber: Yup.string().required('Contact number is required'),
});

export const StepTwoSchema = Yup.object().shape({
  dueDate: Yup.date().required('Estimated Due Date is required'),
  trimester: Yup.string().required('Trimester is required'),
  firstPregnancy: Yup.boolean().required(),
  healthConcerns: Yup.string().optional(),
});

export const StepThreeSchema = Yup.object().shape({
  memberId: Yup.string().required('Member ID is required'),
  planType: Yup.string().required('Plan Type is required'),
  physicianName: Yup.string().required('Primary Physician is required'),
});

export const FinalStepSchema = Yup.object().shape({
  consent: Yup.boolean().oneOf([true], 'Consent is required'),
});
