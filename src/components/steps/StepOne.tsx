import React from 'react';
import { useFormContext } from 'react-hook-form';
import { StepOneData } from '@/lib/validationSchemas';

interface StepOneProps {
  nextStep: () => void;
}

const StepOne: React.FC<StepOneProps> = ({ nextStep }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext<StepOneData>();

  const onSubmit = () => {
    nextStep();
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="space-y-2">
        <label className="block text-neutral font-medium">Full Name</label>
        <input
          {...register('fullName')}
          placeholder="John Doe"
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 text-gray-900 ${
            errors.fullName
              ? 'border-error focus:ring-error/20'
              : 'border-neutral/20 focus:ring-primary/20 focus:border-primary'
          }`}
        />
        {errors.fullName && (
          <p className="text-sm text-error" role="alert">{errors.fullName.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-neutral font-medium">Date of Birth</label>
        <input
          type="date"
          {...register('dob')}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 text-gray-900 ${
            errors.dob
              ? 'border-error focus:ring-error/20'
              : 'border-neutral/20 focus:ring-primary/20 focus:border-primary'
          }`}
        />
        {errors.dob && (
          <p className="text-sm text-error" role="alert">{errors.dob.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-neutral font-medium">Email</label>
        <input
          type="email"
          {...register('email')}
          placeholder="john@example.com"
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 text-gray-900 ${
            errors.email
              ? 'border-error focus:ring-error/20'
              : 'border-neutral/20 focus:ring-primary/20 focus:border-primary'
          }`}
        />
        {errors.email && (
          <p className="text-sm text-error" role="alert">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-neutral font-medium">Contact Number</label>
        <input
          type="tel"
          {...register('contactNumber')}
          placeholder="(123) 456-7890"
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 text-gray-900 ${
            errors.contactNumber
              ? 'border-error focus:ring-error/20'
              : 'border-neutral/20 focus:ring-primary/20 focus:border-primary'
          }`}
        />
        {errors.contactNumber && (
          <p className="text-sm text-error" role="alert">{errors.contactNumber.message}</p>
        )}
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="button"
          onClick={handleSubmit(onSubmit)}
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-focus transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StepOne;
