import React from 'react';
import { useFormContext } from 'react-hook-form';
import { StepThreeData } from '@/lib/validationSchemas';

interface StepThreeProps {
  nextStep: () => void;
  prevStep: () => void;
}

const StepThree: React.FC<StepThreeProps> = ({ nextStep, prevStep }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext<StepThreeData>();

  const onSubmit = () => {
    nextStep();
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="space-y-2">
        <label className="block text-neutral font-medium">Member ID</label>
        <input
          {...register('memberId')}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 text-gray-900 ${
            errors.memberId
              ? 'border-error focus:ring-error/20'
              : 'border-neutral/20 focus:ring-primary/20 focus:border-primary'
          }`}
        />
        {errors.memberId && (
          <p className="text-sm text-error" role="alert">{errors.memberId.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-neutral font-medium">Plan Type</label>
        <select
          {...register('planType')}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 text-gray-900 ${
            errors.planType
              ? 'border-error focus:ring-error/20'
              : 'border-neutral/20 focus:ring-primary/20 focus:border-primary'
          }`}
        >
          <option value="">Select Plan Type</option>
          <option value="Basic">Basic</option>
          <option value="Premium">Premium</option>
          <option value="Elite">Elite</option>
        </select>
        {errors.planType && (
          <p className="text-sm text-error" role="alert">{errors.planType.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-neutral font-medium">Primary Physician</label>
        <input
          {...register('physicianName')}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 text-gray-900 ${
            errors.physicianName
              ? 'border-error focus:ring-error/20'
              : 'border-neutral/20 focus:ring-primary/20 focus:border-primary'
          }`}
        />
        {errors.physicianName && (
          <p className="text-sm text-error" role="alert">{errors.physicianName.message}</p>
        )}
      </div>

      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={prevStep}
          className="px-6 py-2 text-primary border border-primary rounded-lg hover:bg-primary-focus/10 transition-colors"
        >
          Previous
        </button>
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

export default StepThree;
