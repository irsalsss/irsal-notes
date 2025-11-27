'use client';

import { useForm } from 'react-hook-form';
import styles from './auth-form.module.scss';
import { SharedInput, SharedButton } from '@repo/ui';
import {
  EMAIL_REQUIRED_MESSAGE,
  EMAIL_INVALID_MESSAGE,
  PASSWORD_REQUIRED_MESSAGE,
  PASSWORD_MIN_LENGTH_MESSAGE,
} from './constants';
import { SignInDto, SignUpDto } from '@/features/api/model';

type AuthFormData = SignInDto | SignUpDto;

export interface AuthFormProps {
  onSubmitAuth?: (data: AuthFormData) => void;
  submitLabel: string;
}

const AuthForm = ({ onSubmitAuth, submitLabel }: AuthFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({
    mode: 'all',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmitAuth = (data: AuthFormData) => {
    onSubmitAuth?.(data);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(handleSubmitAuth)}>
      <SharedInput
        id="email"
        label="Email"
        type="email"
        register={register('email', {
          required: EMAIL_REQUIRED_MESSAGE,
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: EMAIL_INVALID_MESSAGE,
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
          required: PASSWORD_REQUIRED_MESSAGE,
          minLength: {
            value: 6,
            message: PASSWORD_MIN_LENGTH_MESSAGE,
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

export default AuthForm;
