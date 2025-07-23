import React from 'react';
import styled from 'styled-components';
import FadeIn from '../animations/FadeIn';

const FooterContainer = styled.footer`
  background-color: ${props => props.theme.colors.neutral.darkGray};
  color: ${props => props.theme.colors.neutral.white};
  padding: ${props => props.theme.spacing['3xl']} 0 ${props => props.theme.spacing.lg};
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.lg};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 0 ${props => props.theme.spacing.md};
  }
`;

const FooterTop = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: ${props => props.theme.spacing['2xl']};
  margin-bottom: ${props => props.theme.spacing['2xl']};
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.xl};
  }
`;

const FooterSection = styled.div`
  h3 {
    color: ${props => props.theme.colors.neutral.white};
    margin-bottom: ${props => props.theme.spacing.md};
    font-size: ${props => props.theme.typography.fontSize.lg};
    font-weight: ${props => props.theme.typography.fontWeight.bold};
  }
  
  p {
    color: ${props => props.theme.colors.neutral.lightGray};
    line-height: 1.6;
    margin-bottom: ${props => props.theme.spacing.sm};
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.md};
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: ${props => props.theme.colors.primary.main};
  color: ${props => props.theme.colors.neutral.white};
  border-radius: ${props => props.theme.borderRadius.full};
  text-decoration: none;
  transition: all ${props => props.theme.transitions.normal};
  
  &:hover {
    background-color: ${props => props.theme.colors.primary.dark};
    transform: translateY(-2px);
  }
`;

const QuickLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
`;

const QuickLink = styled.a`
  color: ${props => props.theme.colors.neutral.lightGray};
  text-decoration: none;
  transition: ${props => props.theme.transitions.fast};
  cursor: pointer;
  
  &:hover {
    color: ${props => props.theme.colors.primary.light};
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
  
  span {
    color: ${props => props.theme.colors.neutral.lightGray};
    display: flex;
    align-items: center;
    gap: ${props => props.theme.spacing.sm};
  }
`;

const FooterBottom = styled.div`
  padding-top: ${props => props.theme.spacing.lg};
  border-top: 1px solid ${props => props.theme.colors.neutral.gray};
  display: flex;
  justify-content: center;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: ${props => props.theme.spacing.md};
    text-align: center;
  }
`;

const Copyright = styled.p`
  color: ${props => props.theme.colors.neutral.lightGray};
  font-size: ${props => props.theme.typography.fontSize.sm};
  margin: 0;
`;

const Footer = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterContent>
        <FadeIn>
          <FooterTop>
            <FooterSection>
              <h3>Portfolio</h3>
              <p>
                モダンで魅力的なウェブ体験を創造するWebデザイナー&フロントエンド開発者です。
                ユーザー中心の思考で、美しく機能的なデジタルソリューションを提供します。
              </p>
              <SocialLinks>
                <SocialLink href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <span>📂</span>
                </SocialLink>
                <SocialLink href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <span>💼</span>
                </SocialLink>
                <SocialLink href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <span>🐦</span>
                </SocialLink>
                <SocialLink href="mailto:contact@example.com">
                  <span>📧</span>
                </SocialLink>
              </SocialLinks>
            </FooterSection>
            
            <FooterSection>
              <h3>クイックリンク</h3>
              <QuickLinks>
                <QuickLink onClick={() => scrollToSection('hero')}>
                  ホーム
                </QuickLink>
                <QuickLink onClick={() => scrollToSection('projects')}>
                  プロジェクト
                </QuickLink>
                <QuickLink onClick={() => scrollToSection('about')}>
                  について
                </QuickLink>
                <QuickLink onClick={() => scrollToSection('contact')}>
                  お問い合わせ
                </QuickLink>
              </QuickLinks>
            </FooterSection>
            
            <FooterSection>
              <h3>連絡先</h3>
              <ContactInfo>
                <span>
                  📧 contact@example.com
                </span>
                <span>
                  📱 +81 90-0000-0000
                </span>
                <span>
                  📍 東京, 日本
                </span>
              </ContactInfo>
            </FooterSection>
          </FooterTop>
        </FadeIn>
        
        <FooterBottom>
          <Copyright>
            © {currentYear} Portfolio. All rights reserved.
          </Copyright>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;