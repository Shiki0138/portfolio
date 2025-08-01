import '@testing-library/jest-dom';

// IntersectionObserver のモック
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  
  disconnect() {}
  
  observe() {}
  
  unobserve() {}
};

// ResizeObserver のモック  
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  
  disconnect() {}
  
  observe() {}
  
  unobserve() {}
};

// matchMedia のモック
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});