import { describe, it, expect } from 'vitest';
import getInitials from './index';

describe('getInitials', () => {
  it('should return null for undefined or empty name', () => {
    expect(getInitials()).toBeNull();
    expect(getInitials('')).toBeNull();
  });

  it('should return a single uppercase initial for a single name', () => {
    expect(getInitials('irsal')).toBe('I');
    expect(getInitials('john')).toBe('J');
  });

  it('should return two uppercase initials for a full name', () => {
    expect(getInitials('Irsal Faaza')).toBe('IF');
    expect(getInitials('john doe')).toBe('JD');
  });

  it('should handle multiple spaces and return first two initials', () => {
    expect(getInitials('  Irsal   Faaza  ')).toBe('IF');
    expect(getInitials('John Quincy Adams')).toBe('JQ');
  });

  it('should handle names with only one character', () => {
    expect(getInitials('A B')).toBe('AB');
    expect(getInitials('A')).toBe('A');
  });

  it('should return null for non-string or invalid inputs', () => {
    // @ts-ignore
    expect(getInitials(null)).toBeNull();
    // @ts-ignore
    expect(getInitials(undefined)).toBeNull();
    // @ts-ignore
    expect(getInitials(123)).toBeNull();
    // @ts-ignore
    expect(getInitials({})).toBeNull();
  });

  it('should handle names that might result in empty parts if filter was missing', () => {
    // These cases are handled by the filter in the implementation
    expect(getInitials(' ')).toBeNull();
    expect(getInitials('  ')).toBeNull();
  });
});
