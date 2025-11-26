'use client';

import { useForm } from 'react-hook-form';
import styles from './auth-form.module.scss';
import { SharedInput, SharedButton } from '@repo/ui';

export interface AuthFormData {
  email: string;
  password: string;
}

export interface AuthFormProps {
  onSubmit?: (data: AuthFormData) => void;
  submitLabel?: string;
}

export const AuthForm = ({
  onSubmit,
  submitLabel = 'Submit',
}: AuthFormProps) => {
  const {
    register,
    handleSubmit: handleFormSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmitForm = (data: AuthFormData) => {
    onSubmit?.(data);
  };

  return (
    <form className={styles.form} onSubmit={handleFormSubmit(onSubmitForm)}>
      <SharedInput
        id="email"
        label="Email"
        type="email"
        register={register('email', {
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address',
          },
        })}
        error={errors.email?.message}
        placeholder="Enter your email"
        autoComplete="email"
      />

      <SharedInput
        id="password"
        label="Password"
        type="password"
        register={register('password', {
          required: 'Password is required',
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters',
          },
        })}
        error={errors.password?.message}
        placeholder="Enter your password"
        autoComplete="password"
      />

      <SharedButton type="submit" variant="primary">
        {submitLabel}
      </SharedButton>
    </form>
  );
};
