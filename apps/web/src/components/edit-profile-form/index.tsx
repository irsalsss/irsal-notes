'use client';

import { useForm } from 'react-hook-form';
import {
  SharedInput,
  SharedButton,
  InputEditor,
  showNotification,
} from '@repo/ui';
import styles from './edit-profile-form.module.scss';
import { UpdateUserDto } from '@/features/api/model';
import { useUsersControllerUpdate } from '@/features/api/users/users';
import { UserInfoState, useUserInfoStore } from '@/store/user-info-store';
import { useShallow } from 'zustand/react/shallow';
import { useEffect } from 'react';

type ProfileFormData = Omit<UpdateUserDto, 'email'>;

const EditProfileForm = () => {
  const { userInfo } = useUserInfoStore(
    useShallow((state: UserInfoState) => ({
      userInfo: state.userInfo,
    }))
  );

  const { mutate: updateUser } = useUsersControllerUpdate({
    mutation: {
      onSuccess: () => {
        showNotification({
          message: 'Profile updated successfully',
          variant: 'success',
        });
      },
      onError: (error) => {
        showNotification({
          message: error instanceof Error ? error.message : 'An error occurred',
          variant: 'error',
        });
      },
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<ProfileFormData>({
    defaultValues: {
      name: userInfo?.name,
      jobTitle: userInfo?.jobTitle,
      company: userInfo?.company,
      location: userInfo?.location,
      aboutMe: userInfo?.aboutMe,
    },
  });

  const onSubmit = (data: ProfileFormData) => {
    if (userInfo?.id) {
      updateUser({ id: userInfo.id, data });
    }
  };

  const handleEditorChange = (content: string) => {
    setValue('aboutMe', content);
  };

  useEffect(() => {
    if (userInfo) {
      reset({
        name: userInfo.name,
        jobTitle: userInfo.jobTitle,
        company: userInfo.company,
        location: userInfo.location,
        aboutMe: userInfo.aboutMe,
      });
    }
  }, [userInfo, reset]);

  return (
    <div className={styles['container']}>
      <main className={styles['main']}>
        <h1 className={styles['title']}>Edit Profile</h1>

        <form onSubmit={handleSubmit(onSubmit)} className={styles['form']}>
          <SharedInput
            id="email"
            label="Email"
            placeholder="Enter your email"
            defaultValue={userInfo?.email}
            readOnly
            disabled
          />

          <SharedInput
            id="fullName"
            label="Full Name"
            placeholder="Enter your full name"
            register={register('name', {
              required: 'Full name is required',
            })}
            error={errors.name?.message}
          />

          <SharedInput
            id="jobTitle"
            label="Job Title"
            placeholder="Enter your current job title"
            register={register('jobTitle', {
              required: 'Job title is required',
            })}
            error={errors.jobTitle?.message}
          />

          <SharedInput
            id="company"
            label="Company"
            placeholder="Enter your current company"
            register={register('company')}
            error={errors.company?.message}
          />

          <SharedInput
            id="location"
            label="Location"
            placeholder="Enter your location"
            register={register('location')}
            error={errors.location?.message}
          />

          <div className={styles['editor-section']}>
            <label className={styles['editor-label']}>
              Professional Journey
            </label>
            <div className={styles['editor-wrapper']}>
              <InputEditor
                defaultValue={userInfo?.aboutMe}
                onEditorChange={handleEditorChange}
              />
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
