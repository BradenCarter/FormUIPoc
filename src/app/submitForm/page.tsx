'use client';
import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import StepOne from '@/components/steps/StepOne';
import StepTwo from '@/components/steps/StepTwo';
import StepThree from '@/components/steps/StepThree';
import ReviewAndSubmit from '@/components/steps/ReviewAndSubmit';
import { StepOneSchema, FinalStepSchema } from '@/lib/validationSchemas';
import { submitForm } from './actions/submitForm';

const SubmitForm = () => {
  const [step, setStep] = useState(1);
  const methods = useForm({
    mode: 'onBlur',
    resolver: step === 4 ? zodResolver(FinalStepSchema) : zodResolver(StepOneSchema),
  });

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const onSubmit = async (data: { [key: string]: string }) => {
    try {
      const formData = {
        userSubId: data.memberId,
        firstName: data.fullName.split(' ')[0],
        lastName: data.fullName.split(' ').slice(1).join(' '),
        email: data.email,
        contactNumber: data.contactNumber,
        dob: data.dob,
      };
      
      await submitForm(formData);
      
      const response = await fetch('/api/sendForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send email notification');
      }

      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form. Please try again.');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <StepOne nextStep={nextStep} />;
      case 2:
        return <StepTwo nextStep={nextStep} prevStep={prevStep} />;
      case 3:
        return <StepThree nextStep={nextStep} prevStep={prevStep} />;
      case 4:
        return <ReviewAndSubmit prevStep={prevStep} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-neutral mb-6">Maternity Enrollment Form</h1>
          
          {/* Progress bar */}
          <div className="w-full h-2 bg-base-200 rounded-full mb-8">
            <div
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>

          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              {renderStep()}
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default SubmitForm;