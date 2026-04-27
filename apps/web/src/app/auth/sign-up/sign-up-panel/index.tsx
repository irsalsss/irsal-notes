'use client';

import Link from 'next/link';
import AuthForm from '@/components/auth-form';
import styles from './sign-up-panel.module.scss';
import {
  getAuthControllerGetProfileQueryKey,
  useAuthControllerSignUp,
} from '@/features/api/auth/auth';
import { showNotification } from '@repo/ui';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { SignUpDto } from '@/features/api/model/signUpDto';

const SignUpPanel = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: signUp } = useAuthControllerSignUp();
  const handleSignUp = (data: SignUpDto) => {
    signUp(
      { data },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey: getAuthControllerGetProfileQueryKey(),
          });

          showNotification({
            message: 'Sign up successful',
            variant: 'success',
          });

          router.push('/');
        },
        onError: () => {
          showNotification({
            message: 'Sign up failed',
            variant: 'error',
          });
        },
      }
    );
  };

  return (
    <div className={styles['panel']}>
      <div className={styles['content']}>
        <h1 className={styles['heading']}>Sign Up</h1>

        <AuthForm onSubmitAuth={handleSignUp} submitLabel="Sign Up" />

        <div className={styles['linkContainer']}>
          Already have an account?{' '}
          <Link href="/auth/sign-in" className={styles['link']}>
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPanel;
