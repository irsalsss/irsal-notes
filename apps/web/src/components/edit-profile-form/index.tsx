'use client';

import { useForm } from 'react-hook-form';
import { SharedInput, SharedButton, InputEditor } from '@repo/ui';
import styles from './edit-profile-form.module.scss';

interface ProfileFormData {
  fullName: string;
  jobTitle: string;
}

const EditProfileForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    defaultValues: {
      fullName: 'Your Full Name',
      jobTitle: 'Your Job Title',
    },
  });

  const onSubmit = (data: ProfileFormData) => {
    console.log('Form submitted:', data);
    // TODO: Implement save logic
  };

  return (
    <div className={styles['container']}>
      <main className={styles['main']}>
        <h1 className={styles['title']}>Edit Profile</h1>

        <form onSubmit={handleSubmit(onSubmit)} className={styles['form']}>
          <SharedInput
            id="fullName"
            label="Full Name"
            placeholder="Enter your full name"
            register={register('fullName', {
              required: 'Full name is required',
            })}
            error={errors.fullName?.message}
          />

          <SharedInput
            id="jobTitle"
            label="Job Title"
            placeholder="Enter your job title"
            register={register('jobTitle', {
              required: 'Job title is required',
            })}
            error={errors.jobTitle?.message}
          />

          <div className={styles['editor-section']}>
            <label className={styles['editor-label']}>
              Professional Journey
            </label>
            <div className={styles['editor-wrapper']}>
              <InputEditor />
            </div>
          </div>

          <div className={styles['actions']}>
            <SharedButton type="submit">Save Changes</SharedButton>
          </div>
        </form>
      </main>
    </div>
  );
};

export default EditProfileForm;
