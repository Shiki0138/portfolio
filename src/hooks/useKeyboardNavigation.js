import { useEffect, useRef } from 'react';

export const useKeyboardNavigation = (options = {}) => {
  const {
    onEnter = () => {},
    onEscape = () => {},
    onArrowUp = () => {},
    onArrowDown = () => {},
    onArrowLeft = () => {},
    onArrowRight = () => {},
    onTab = () => {},
    enabled = true
  } = options;

  const ref = useRef(null);

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'Enter':
          onEnter(event);
          break;
        case 'Escape':
          onEscape(event);
          break;
        case 'ArrowUp':
          event.preventDefault();
          onArrowUp(event);
          break;
        case 'ArrowDown':
          event.preventDefault();
          onArrowDown(event);
          break;
        case 'ArrowLeft':
          event.preventDefault();
          onArrowLeft(event);
          break;
        case 'ArrowRight':
          event.preventDefault();
          onArrowRight(event);
          break;
        case 'Tab':
          onTab(event);
          break;
        default:
          break;
      }
    };

    const element = ref.current;
    if (element) {
      element.addEventListener('keydown', handleKeyDown);
      return () => element.removeEventListener('keydown', handleKeyDown);
    }
  }, [enabled, onEnter, onEscape, onArrowUp, onArrowDown, onArrowLeft, onArrowRight, onTab]);

  return ref;
};

export const useFocusTrap = (isActive) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!isActive) return;

    const element = ref.current;
    if (!element) return;

    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    document.addEventListener('keydown', handleTabKey);
    
    // 最初の要素にフォーカスを設定
    if (firstElement) {
      firstElement.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleTabKey);
    };
  }, [isActive]);

  return ref;
};

export const useAnnouncement = () => {
  const announce = (message, priority = 'polite') => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.style.width = '1px';
    announcement.style.height = '1px';
    announcement.style.overflow = 'hidden';
    
    document.body.appendChild(announcement);
    
    // 少し遅延させてからメッセージを設定（スクリーンリーダーが確実に読み上げるため）
    setTimeout(() => {
      announcement.textContent = message;
    }, 100);
    
    // メッセージを読み上げた後に要素を削除
    setTimeout(() => {
      if (document.body.contains(announcement)) {
        document.body.removeChild(announcement);
      }
    }, 2000);
  };

  return announce;
};