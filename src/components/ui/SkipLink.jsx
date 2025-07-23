import React from 'react';
import styled from 'styled-components';

const SkipLinkContainer = styled.a`
  position: absolute;
  top: -40px;
  left: 6px;
  background: ${props => props.theme.colors.primary.main};
  color: ${props => props.theme.colors.neutral.white};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.sm};
  text-decoration: none;
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  z-index: 1000;
  transition: ${props => props.theme.transitions.fast};
  
  &:focus {
    top: 6px;
  }
  
  &:hover {
    background: ${props => props.theme.colors.primary.dark};
  }
`;

const SkipLink = ({ href = '#main-content', children = 'メインコンテンツへスキップ' }) => {
  return (
    <SkipLinkContainer href={href}>
      {children}
    </SkipLinkContainer>
  );
};

export default SkipLink;