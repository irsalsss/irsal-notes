import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { AuthGuard } from './auth-guard';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthControllerGetProfile } from '@/features/api/auth/auth';
import { useUserInfoStore } from '@/store/user-info-store';

vi.mock('@/features/api/auth/auth', () => ({
  useAuthControllerGetProfile: vi.fn(),
}));

vi.mock('@/store/user-info-store', () => ({
  useUserInfoStore: vi.fn(),
}));

describe('AuthGuard', () => {
  const mockPush = vi.fn();
  const mockSetUserInfo = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as any).mockReturnValue({ push: mockPush });
    
    // Make sure the selector passed to useUserInfoStore is executed
    (useUserInfoStore as any).mockImplementation((selector: any) => {
      if (typeof selector === 'function') {
        return selector({ setUserInfo: mockSetUserInfo });
      }
      return { setUserInfo: mockSetUserInfo };
    });
  });

  it('should render children if user is authenticated and not on an auth page', () => {
    (usePathname as any).mockReturnValue('/app/dashboard');
    (useAuthControllerGetProfile as any).mockImplementation((options: any) => {
      // Execute the select function to cover it
      if (options?.query?.select) {
        options.query.select({ data: { id: 1, email: 'test' } });
      }
      return {
        data: { id: 1, email: 'test@example.com' },
        isLoading: false,
        isError: false,
      };
    });

    render(
      <AuthGuard>
        <div>Dashboard Content</div>
      </AuthGuard>
    );

    expect(screen.getByText('Dashboard Content')).toBeDefined();
    expect(mockSetUserInfo).toHaveBeenCalled();
  });

  it('should render children if on an auth page', () => {
    (usePathname as any).mockReturnValue('/auth/sign-in');
    (useAuthControllerGetProfile as any).mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
    });

    render(
      <AuthGuard>
        <div>Sign In Content</div>
      </AuthGuard>
    );

    expect(screen.getByText('Sign In Content')).toBeDefined();
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('should redirect to sign-in if not authenticated and not on an auth page', () => {
    (usePathname as any).mockReturnValue('/app/dashboard');
    (useAuthControllerGetProfile as any).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });

    const { container } = render(
      <AuthGuard>
        <div>Dashboard Content</div>
      </AuthGuard>
    );

    expect(container.firstChild).toBeNull();
    expect(mockPush).toHaveBeenCalledWith('/auth/sign-in');
  });

  it('should redirect to home if authenticated and on an auth page', () => {
    (usePathname as any).mockReturnValue('/auth/sign-up');
    (useAuthControllerGetProfile as any).mockReturnValue({
      data: { id: 1 },
      isLoading: false,
      isError: false,
    });

    render(
      <AuthGuard>
        <div>Sign Up Content</div>
      </AuthGuard>
    );

    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('should return null while loading', () => {
    (usePathname as any).mockReturnValue('/app/dashboard');
    (useAuthControllerGetProfile as any).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });

    const { container } = render(
      <AuthGuard>
        <div>Dashboard Content</div>
      </AuthGuard>
    );

    expect(container.firstChild).toBeNull();
  });
});
