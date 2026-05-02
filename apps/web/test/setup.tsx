import '@testing-library/jest-dom';
import { vi } from 'vitest';
import React from 'react';

// Mock Next.js navigation
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  })),
  useSearchParams: vi.fn(() => new URLSearchParams()),
  usePathname: vi.fn(() => ''),
}));

// Mock TanStack Query
vi.mock('@tanstack/react-query', () => ({
  useQueryClient: vi.fn(() => ({
    invalidateQueries: vi.fn(),
  })),
}));

// Mock @repo/ui
vi.mock('@repo/ui', () => ({
  showNotification: vi.fn(),
  SharedInput: vi.fn(({ label, placeholder, register, error, ...props }) => (
    <div>
      <label>{label}</label>
      <input placeholder={placeholder} {...register} {...props} />
      {error && <span>{error}</span>}
    </div>
  )),
  SharedButton: vi.fn(({ children, ...props }) => (
    <button {...props}>{children}</button>
  )),
}));
