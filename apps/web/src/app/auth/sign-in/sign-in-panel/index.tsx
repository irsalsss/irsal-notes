'use client';

import Link from 'next/link';
import { AuthForm } from '@/components/auth-form/auth-form';
import styles from './sign-in-panel.module.scss';

const SignInPanel = () => {
  const handleSignIn = (data: { email: string; password: string }) => {
    console.log('Sign in submitted:', data);
    // TODO: Implement sign in logic
  };

  return (
    <div className={styles['panel']}>
      <div className={styles['content']}>
        <h1 className={styles['heading']}>Sign In</h1>

        <AuthForm onSubmit={handleSignIn} submitLabel="Sign In" />

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
