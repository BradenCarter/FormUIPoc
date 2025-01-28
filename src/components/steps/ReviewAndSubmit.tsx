import React from 'react';
import { useFormContext } from 'react-hook-form';

interface ReviewAndSubmitProps {
  prevStep: () => void;
  onSubmit: (data: { [key: string]: string }) => void;
}

const ReviewAndSubmit: React.FC<ReviewAndSubmitProps> = ({ prevStep, onSubmit }) => {
  const {
    handleSubmit,
    getValues,
    register,
    formState: { errors },
  } = useFormContext();

  const values = getValues();

  const InfoSection = ({ title, items }: { title: string; items: { label: string; value: string | number }[] }) => (
    <div className="bg-base-200 p-4 rounded-lg space-y-2">
      <h3 className="font-semibold text-neutral">{title}</h3>
      <dl className="grid grid-cols-1 gap-2">
        {items.map(({ label, value }) => (
          <div key={label} className="flex justify-between">
            <dt className="text-neutral/70">{label}:</dt>
            <dd className="font-medium text-neutral">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-neutral">Review Your Information</h2>
      <div className="space-y-4">
        <InfoSection
          title="Personal Information"
          items={[
            { label: 'Full Name', value: values.fullName },
            { label: 'Date of Birth', value: values.dob },
            { label: 'Email', value: values.email },
            { label: 'Contact Number', value: values.contactNumber },
          ]}
        />

        <InfoSection
          title="Pregnancy Information"
          items={[
            { label: 'Due Date', value: values.dueDate },
            { label: 'Trimester', value: values.trimester },
            { label: 'First Pregnancy', value: values.firstPregnancy ? 'Yes' : 'No' },
            { label: 'Health Concerns', value: values.healthConcerns || 'None' },
          ]}
        />

        <InfoSection
          title="Insurance Information"
          items={[
            { label: 'Member ID', value: values.memberId },
            { label: 'Plan Type', value: values.planType },
            { label: 'Primary Physician', value: values.physicianName },
          ]}
        />
      </div>

      <div className="space-y-4 pt-4">
        <div className="flex items-start space-x-2">
          <input
            type="checkbox"
            {...register('consent')}
            id="consent"
            className="mt-1 w-4 h-4 text-primary border-neutral/20 rounded focus:ring-primary/20"
          />
          <label htmlFor="consent" className="text-sm text-neutral">
            I confirm that all the information provided is accurate and complete. I understand that providing false information
            may result in the denial of my enrollment.
          </label>
        </div>
        {errors.consent?.message && (
          <p className="text-sm text-error" role="alert">{String(errors.consent.message)}</p>
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
          type="submit"
          onClick={handleSubmit((data) => {
            const values = getValues();
            const formData = { ...values, ...data };
            handleSubmit(() => onSubmit(formData))();
          })}
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-focus transition-colors"
        >
          Submit Form
        </button>
      </div>
    </div>
  );
};

export default ReviewAndSubmit;
