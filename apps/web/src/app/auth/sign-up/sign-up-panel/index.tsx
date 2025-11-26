'use client';

import Link from 'next/link';
import { AuthForm } from '@/components/auth-form/auth-form';
import styles from './sign-up-panel.module.scss';

const SignUpPanel = () => {
  const handleSignUp = (data: { email: string; password: string }) => {
    console.log('Sign up submitted:', data);
    // TODO: Implement sign up logic
  };

  return (
    <div className={styles['panel']}>
      <div className={styles['content']}>
        <h1 className={styles['heading']}>Sign Up</h1>

        <AuthForm onSubmit={handleSignUp} submitLabel="Sign Up" />

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
