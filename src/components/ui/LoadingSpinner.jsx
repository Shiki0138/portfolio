import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing.xl};
  min-height: ${props => props.$minHeight || '200px'};
`;

const Spinner = styled.div`
  width: ${props => props.$size || '40px'};
  height: ${props => props.$size || '40px'};
  border: 3px solid ${props => props.theme.colors.neutral.lightGray};
  border-top: 3px solid ${props => props.theme.colors.primary.main};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const LoadingText = styled.p`
  margin-top: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.neutral.gray};
  font-size: ${props => props.theme.typography.fontSize.md};
`;

const LoadingSpinner = ({ 
  size = '40px', 
  text = '読み込み中...', 
  minHeight = '200px' 
}) => {
  return (
    <SpinnerContainer $minHeight={minHeight}>
      <Spinner $size={size} />
      {text && <LoadingText>{text}</LoadingText>}
    </SpinnerContainer>
  );
};

export default LoadingSpinner;