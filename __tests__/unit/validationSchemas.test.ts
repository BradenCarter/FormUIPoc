import { StepOneSchema, StepTwoSchema, StepThreeSchema, FinalStepSchema } from '../../lib/validationSchemas';
import { ValidationError } from 'yup';

describe('Form Validation Schemas', () => {
  describe('StepOneSchema', () => {
    it('fails validation if required fields are missing', async () => {
      const invalidData = {
        fullName: '',
        dob: '',
        email: '',
        contactNumber: ''
      };
      
      await expect(StepOneSchema.validate(invalidData))
        .rejects
        .toThrow(ValidationError);
    });

    it('passes validation for valid data', async () => {
      const validData = {
        fullName: 'Jane Doe',
        dob: new Date('1990-01-01'),
        email: 'jane@example.com',
        contactNumber: '1234567890'
      };
      
      await expect(StepOneSchema.validate(validData))
        .resolves
        .toBeTruthy();
    });

    it('fails validation for invalid email', async () => {
      const invalidData = {
        fullName: 'Jane Doe',
        dob: new Date('1990-01-01'),
        email: 'invalid-email',
        contactNumber: '1234567890'
      };
      
      await expect(StepOneSchema.validate(invalidData))
        .rejects
        .toThrow('Invalid email');
    });
  });

  describe('StepTwoSchema', () => {
    it('passes validation for valid data', async () => {
      const validData = {
        dueDate: new Date('2024-09-01'),
        trimester: 'First',
        firstPregnancy: true,
        healthConcerns: 'None'
      };
      
      await expect(StepTwoSchema.validate(validData))
        .resolves
        .toBeTruthy();
    });

    it('allows empty healthConcerns', async () => {
      const validData = {
        dueDate: new Date('2024-09-01'),
        trimester: 'First',
        firstPregnancy: true,
        healthConcerns: ''
      };
      
      await expect(StepTwoSchema.validate(validData))
        .resolves
        .toBeTruthy();
    });
  });

  describe('StepThreeSchema', () => {
    it('passes validation for valid data', async () => {
      const validData = {
        memberId: 'MEM123456',
        planType: 'Premium',
        physicianName: 'Dr. Smith'
      };
      
      await expect(StepThreeSchema.validate(validData))
        .resolves
        .toBeTruthy();
    });
  });

  describe('FinalStepSchema', () => {
    it('fails if consent is false', async () => {
      const invalidData = {
        consent: false
      };
      
      await expect(FinalStepSchema.validate(invalidData))
        .rejects
        .toThrow('Consent is required');
    });

    it('passes if consent is true', async () => {
      const validData = {
        consent: true
      };
      
      await expect(FinalStepSchema.validate(validData))
        .resolves
        .toBeTruthy();
    });
  });
});
