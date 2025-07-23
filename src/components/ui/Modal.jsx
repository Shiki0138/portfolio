import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { useSpring, animated, useTransition } from '@react-spring/web';

const Overlay = styled(animated.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing.lg};
`;

const ModalContainer = styled(animated.div)`
  background-color: ${props => props.theme.colors.neutral.white};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.xl};
  max-width: ${props => props.$maxWidth || '500px'};
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const ModalHeader = styled.div`
  padding: ${props => props.theme.spacing.lg};
  border-bottom: 1px solid ${props => props.theme.colors.neutral.lightGray};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ModalTitle = styled.h2`
  margin: 0;
  color: ${props => props.theme.colors.neutral.black};
  font-size: ${props => props.theme.typography.fontSize['2xl']};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: ${props => props.theme.typography.fontSize['2xl']};
  color: ${props => props.theme.colors.neutral.gray};
  cursor: pointer;
  padding: ${props => props.theme.spacing.xs};
  border-radius: ${props => props.theme.borderRadius.sm};
  transition: ${props => props.theme.transitions.fast};
  
  &:hover {
    background-color: ${props => props.theme.colors.neutral.lightGray};
    color: ${props => props.theme.colors.neutral.black};
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primary.main}40;
  }
`;

const ModalBody = styled.div`
  padding: ${props => props.theme.spacing.lg};
`;

const ModalFooter = styled.div`
  padding: ${props => props.theme.spacing.lg};
  border-top: 1px solid ${props => props.theme.colors.neutral.lightGray};
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  justify-content: flex-end;
`;

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  footer,
  maxWidth,
  closeOnOverlayClick = true,
  showCloseButton = true
}) => {
  const transition = useTransition(isOpen, {
    from: { opacity: 0, transform: 'translate(-50%, -50%) scale(0.8)' },
    enter: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
    leave: { opacity: 0, transform: 'translate(-50%, -50%) scale(0.8)' },
    config: { tension: 300, friction: 30 }
  });

  // ESCキーでモーダルを閉じる
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // スクロールを防ぐ
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleOverlayClick = (event) => {
    if (closeOnOverlayClick && event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    transition((style, item) =>
      item && (
        <Overlay style={{ opacity: style.opacity }} onClick={handleOverlayClick}>
          <ModalContainer 
            style={{ 
              transform: style.transform,
              opacity: style.opacity 
            }}
            $maxWidth={maxWidth}
            onClick={e => e.stopPropagation()}
          >
            {title && (
              <ModalHeader>
                <ModalTitle>{title}</ModalTitle>
                {showCloseButton && (
                  <CloseButton onClick={onClose} aria-label="Close modal">
                    ×
                  </CloseButton>
                )}
              </ModalHeader>
            )}
            
            <ModalBody>
              {children}
            </ModalBody>
            
            {footer && (
              <ModalFooter>
                {footer}
              </ModalFooter>
            )}
          </ModalContainer>
        </Overlay>
      )
    ),
    document.body
  );
};

export default Modal;