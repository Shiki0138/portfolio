import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useIntersectionObserver } from '../useIntersectionObserver';

// IntersectionObserver のモック
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null
});

beforeEach(() => {
  window.IntersectionObserver = mockIntersectionObserver;
  mockIntersectionObserver.mockClear();
});

describe('useIntersectionObserver', () => {
  it('should initialize with correct default values', () => {
    const { result } = renderHook(() => useIntersectionObserver());
    
    expect(result.current.isIntersecting).toBe(false);
    expect(result.current.hasIntersected).toBe(false);
    expect(result.current.ref).toBeDefined();
  });

  it('should create IntersectionObserver with default options', () => {
    renderHook(() => useIntersectionObserver());
    
    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      expect.objectContaining({
        threshold: 0.1,
        rootMargin: '0px'
      })
    );
  });

  it('should accept custom options', () => {
    const customOptions = {
      threshold: 0.5,
      rootMargin: '100px'
    };
    
    renderHook(() => useIntersectionObserver(customOptions));
    
    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      expect.objectContaining(customOptions)
    );
  });
});