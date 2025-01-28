import React from 'react';
import { useFormContext } from 'react-hook-form';
import { StepTwoData } from '@/lib/validationSchemas';

interface StepTwoProps {
  nextStep: () => void;
  prevStep: () => void;
}

const StepTwo: React.FC<StepTwoProps> = ({ nextStep, prevStep }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext<StepTwoData>();

  const onSubmit = () => {
    nextStep();
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="space-y-2">
        <label className="block text-neutral font-medium">Estimated Due Date</label>
        <input
          type="date"
          {...register('dueDate')}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 text-gray-900 ${
            errors.dueDate
              ? 'border-error focus:ring-error/20'
              : 'border-neutral/20 focus:ring-primary/20 focus:border-primary'
          }`}
        />
        {errors.dueDate && (
          <p className="text-sm text-error" role="alert">{errors.dueDate.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-neutral font-medium">Current Trimester</label>
        <select
          {...register('trimester')}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 text-gray-900 ${
            errors.trimester
              ? 'border-error focus:ring-error/20'
              : 'border-neutral/20 focus:ring-primary/20 focus:border-primary'
          }`}
        >
          <option value="">Select Trimester</option>
          <option value="First">First Trimester</option>
          <option value="Second">Second Trimester</option>
          <option value="Third">Third Trimester</option>
        </select>
        {errors.trimester && (
          <p className="text-sm text-error" role="alert">{errors.trimester.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            {...register('firstPregnancy')}
            className="w-4 h-4 text-primary border-neutral/20 rounded focus:ring-primary/20"
          />
          <span className="text-neutral">Is this your first pregnancy?</span>
        </label>
      </div>

      <div className="space-y-2">
        <label className="block text-neutral font-medium">Any Health Concerns? (Optional)</label>
        <textarea
          {...register('healthConcerns')}
          placeholder="Please list any health concerns or conditions..."
          rows={4}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 text-gray-900 ${
            errors.healthConcerns
              ? 'border-error focus:ring-error/20'
              : 'border-neutral/20 focus:ring-primary/20 focus:border-primary'
          }`}
        />
        {errors.healthConcerns && (
          <p className="text-sm text-error" role="alert">{errors.healthConcerns.message}</p>
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

export default StepTwo;
