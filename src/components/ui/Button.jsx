import React from 'react';
import styled, { css } from 'styled-components';
import { useSpring, animated } from '@react-spring/web';

const buttonVariants = {
  primary: css`
    background-color: ${props => props.theme.colors.primary.main};
    color: ${props => props.theme.colors.neutral.white};
    
    &:hover:not(:disabled) {
      background-color: ${props => props.theme.colors.primary.dark};
    }
  `,
  secondary: css`
    background-color: ${props => props.theme.colors.secondary.main};
    color: ${props => props.theme.colors.neutral.white};
    
    &:hover:not(:disabled) {
      background-color: ${props => props.theme.colors.secondary.dark};
    }
  `,
  outline: css`
    background-color: transparent;
    color: ${props => props.theme.colors.primary.main};
    border: 2px solid ${props => props.theme.colors.primary.main};
    
    &:hover:not(:disabled) {
      background-color: ${props => props.theme.colors.primary.main};
      color: ${props => props.theme.colors.neutral.white};
    }
  `,
  ghost: css`
    background-color: transparent;
    color: ${props => props.theme.colors.primary.main};
    
    &:hover:not(:disabled) {
      background-color: ${props => props.theme.colors.primary.main}20;
    }
  `
};

const buttonSizes = {
  small: css`
    padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
    font-size: ${props => props.theme.typography.fontSize.sm};
  `,
  medium: css`
    padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
    font-size: ${props => props.theme.typography.fontSize.md};
  `,
  large: css`
    padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
    font-size: ${props => props.theme.typography.fontSize.lg};
  `
};

const StyledButton = styled(animated.button)`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.normal};
  overflow: hidden;
  white-space: nowrap;
  
  ${props => buttonVariants[props.$variant]}
  ${props => buttonSizes[props.$size]}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary.main}40;
  }
  
  ${props => props.$fullWidth && css`
    width: 100%;
  `}
`;

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  fullWidth = false,
  icon,
  iconPosition = 'left',
  onClick,
  disabled = false,
  type = 'button',
  ...props 
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  
  const buttonAnimation = useSpring({
    transform: isHovered && !disabled ? 'scale(1.05)' : 'scale(1)',
    config: { tension: 300, friction: 20 }
  });

  return (
    <StyledButton
      style={buttonAnimation}
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      onClick={onClick}
      disabled={disabled}
      type={type}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {icon && iconPosition === 'left' && icon}
      {children}
      {icon && iconPosition === 'right' && icon}
    </StyledButton>
  );
};

export default Button;