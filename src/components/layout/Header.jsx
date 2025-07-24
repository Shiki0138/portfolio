import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from '@react-spring/web';
import { useWindowSize } from '../../hooks/useWindowSize';

const HeaderContainer = styled(animated.header)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  background-color: ${props => props.$isScrolled ? 
    `${props.theme.colors.neutral.white}95` : 
    'transparent'
  };
  backdrop-filter: ${props => props.$isScrolled ? 'blur(10px)' : 'none'};
  border-bottom: ${props => props.$isScrolled ? 
    `1px solid ${props.theme.colors.neutral.lightGray}` : 
    'none'
  };
  transition: all ${props => props.theme.transitions.normal};
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.lg};
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 0 ${props => props.theme.spacing.md};
    height: 70px;
  }
`;

const Logo = styled.div`
  font-size: ${props => props.theme.typography.fontSize['2xl']};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.primary.main};
  cursor: pointer;
  
  &:hover {
    color: ${props => props.theme.colors.primary.dark};
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xl};
  
  @media (max-width: 768px) {
    display: ${props => props.$isOpen ? 'flex' : 'none'};
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    flex-direction: column;
    background-color: ${props => props.theme.colors.neutral.white};
    padding: ${props => props.theme.spacing.lg};
    box-shadow: ${props => props.theme.shadows.md};
    gap: ${props => props.theme.spacing.md};
    z-index: 1000;
  }
`;

const NavLink = styled.a`
  color: ${props => props.theme.colors.neutral.black};
  text-decoration: none;
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  transition: ${props => props.theme.transitions.fast};
  position: relative;
  
  &:hover {
    color: ${props => props.theme.colors.primary.main};
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: ${props => props.theme.colors.primary.main};
    transition: width ${props => props.theme.transitions.normal};
  }
  
  &:hover::after {
    width: 100%;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: ${props => props.theme.spacing.xs};
  
  @media (max-width: 768px) {
    display: flex;
  }
  
  span {
    width: 25px;
    height: 3px;
    background-color: ${props => props.theme.colors.neutral.black};
    transition: all ${props => props.theme.transitions.fast};
    transform-origin: center;
    
    &:nth-child(1) {
      transform: ${props => props.$isOpen ? 'rotate(45deg) translateY(7px)' : 'none'};
    }
    
    &:nth-child(2) {
      opacity: ${props => props.$isOpen ? '0' : '1'};
    }
    
    &:nth-child(3) {
      transform: ${props => props.$isOpen ? 'rotate(-45deg) translateY(-7px)' : 'none'};
    }
  }
`;

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { width } = useWindowSize();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (width > 768) {
      setIsMobileMenuOpen(false);
    }
  }, [width]);

  const headerAnimation = useSpring({
    transform: isScrolled ? 'translateY(0)' : 'translateY(0)',
    boxShadow: isScrolled ? '0 2px 20px rgba(0,0,0,0.1)' : '0 0px 0px rgba(0,0,0,0)',
  });

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <HeaderContainer style={headerAnimation} $isScrolled={isScrolled}>
      <NavContainer>
        <Logo onClick={() => scrollToSection('hero')}>
          Portfolio
        </Logo>
        
        <Nav $isOpen={isMobileMenuOpen}>
          <NavLink onClick={() => scrollToSection('hero')}>
            Home
          </NavLink>
          <NavLink onClick={() => scrollToSection('projects')}>
            Projects
          </NavLink>
          <NavLink onClick={() => scrollToSection('subsidies')}>
            補助金
          </NavLink>
          <NavLink onClick={() => scrollToSection('contact')}>
            Contact
          </NavLink>
        </Nav>
        
        <MobileMenuButton 
          $isOpen={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </MobileMenuButton>
      </NavContainer>
    </HeaderContainer>
  );
};

export default Header;