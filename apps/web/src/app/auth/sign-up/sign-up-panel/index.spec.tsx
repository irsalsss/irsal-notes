import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import SignUpPanel from './index';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { useAuthControllerSignUp, getAuthControllerGetProfileQueryKey } from '@/features/api/auth/auth';
import { showNotification } from '@repo/ui';

// Mock the API hook
vi.mock('@/features/api/auth/auth', () => ({
  useAuthControllerSignUp: vi.fn(),
  getAuthControllerGetProfileQueryKey: vi.fn(() => ['profile']),
}));

describe('SignUpPanel', () => {
  const mockPush = vi.fn();
  const mockInvalidateQueries = vi.fn();
  const mockMutate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    
    // Setup mocks
    (useRouter as any).mockReturnValue({ push: mockPush });
    (useQueryClient as any).mockReturnValue({ invalidateQueries: mockInvalidateQueries });
    (useAuthControllerSignUp as any).mockReturnValue({
      mutate: mockMutate,
      isPending: false,
    });
  });

  it('should render the sign up panel correctly', () => {
    render(<SignUpPanel />);
    
    expect(screen.getByRole('heading', { name: /Sign Up/i })).toBeDefined();
    expect(screen.getByPlaceholderText(/Enter your email/i)).toBeDefined();
    expect(screen.getByPlaceholderText(/Enter your password/i)).toBeDefined();
  });

  it('should call signUp when form is submitted', async () => {
    render(<SignUpPanel />);
    
    fireEvent.change(screen.getByPlaceholderText(/Enter your email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter your password/i), {
      target: { value: 'password123' },
    });
    
    fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith(
        { data: { email: 'test@example.com', password: 'password123' } },
        expect.any(Object)
      );
    });
  });

  it('should handle success callback correctly', async () => {
    // Capture the callbacks passed to mutate
    let successCallback: any;
    mockMutate.mockImplementation((_data, options) => {
      successCallback = options.onSuccess;
    });

    render(<SignUpPanel />);
    
    fireEvent.change(screen.getByPlaceholderText(/Enter your email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter your password/i), {
      target: { value: 'password123' },
    });
    
    fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));

    await waitFor(() => {
      expect(successCallback).toBeDefined();
    });

    // Execute success callback
    await successCallback();

    expect(mockInvalidateQueries).toHaveBeenCalledWith({
      queryKey: ['profile'],
    });
    expect(showNotification).toHaveBeenCalledWith({
      message: 'Sign up successful',
      variant: 'success',
    });
    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('should handle error callback correctly', async () => {
    // Capture the callbacks passed to mutate
    let errorCallback: any;
    mockMutate.mockImplementation((_data, options) => {
      errorCallback = options.onError;
    });

    render(<SignUpPanel />);
    
    fireEvent.change(screen.getByPlaceholderText(/Enter your email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter your password/i), {
      target: { value: 'password123' },
    });
    
    fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));

    await waitFor(() => {
      expect(errorCallback).toBeDefined();
    });

    // Execute error callback
    errorCallback();

    expect(showNotification).toHaveBeenCalledWith({
      message: 'Sign up failed',
      variant: 'error',
    });
  });
});
