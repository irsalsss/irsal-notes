'use client';

import Link from 'next/link';
import { AuthForm } from '@/components/auth-form';
import styles from './sign-in-panel.module.scss';
import { useAuthControllerSignIn } from '@/features/api/auth/auth';
import { SignInDto } from '@/features/api/model';
import { useRouter } from 'next/navigation';
import { showNotification } from '@repo/ui';

const SignInPanel = () => {
  const { mutate: signIn } = useAuthControllerSignIn();
  const router = useRouter();

  const handleSignIn = (data: SignInDto) => {
    signIn(
      { data },
      {
        onSuccess: () => {
          showNotification({
            message: 'Sign in successful',
            variant: 'success',
          });
          router.push('/');
        },
        onError: (data) => {
          console.log('data::: ', data);
          showNotification({
            message: 'Sign in failed',
            variant: 'error',
          });
        },
      }
    );
  };

  return (
    <div className={styles['panel']}>
      <div className={styles['content']}>
        <h1 className={styles['heading']}>Sign In</h1>

        <AuthForm onSubmitAuth={handleSignIn} submitLabel="Sign In" />

        <div className={styles['linkContainer']}>
          Don&apos;t have an account?{' '}
          <Link href="/auth/sign-up" className={styles['link']}>
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignInPanel;
