import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from '@react-spring/web';
import TypewriterEffect from '../animations/TypewriterEffect';
import FadeIn from '../animations/FadeIn';
import ParallaxEffect from '../animations/ParallaxEffect';
import Button from '../ui/Button';
import { useMousePosition } from '../../hooks/useMousePosition';

const HeroContainer = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, 
    ${props => props.theme.colors.primary.main}10 0%, 
    ${props => props.theme.colors.secondary.main}10 100%
  );
  overflow: hidden;
`;

const BackgroundElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const FloatingShape = styled(animated.div)`
  position: absolute;
  border-radius: 50%;
  background: ${props => props.$color};
  filter: blur(1px);
  opacity: 0.6;
`;

const ContentContainer = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.lg};
  text-align: center;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 0 ${props => props.theme.spacing.md};
  }
`;

const MainTitle = styled.h1`
  font-size: ${props => props.theme.typography.fontSize['5xl']};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.neutral.black};
  margin-bottom: ${props => props.theme.spacing.md};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: ${props => props.theme.typography.fontSize['4xl']};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: ${props => props.theme.typography.fontSize['3xl']};
  }
`;

const Subtitle = styled.div`
  font-size: ${props => props.theme.typography.fontSize['2xl']};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.theme.colors.primary.main};
  margin-bottom: ${props => props.theme.spacing.lg};
  min-height: 40px;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: ${props => props.theme.typography.fontSize.xl};
  }
`;

const Description = styled.p`
  font-size: ${props => props.theme.typography.fontSize.lg};
  color: ${props => props.theme.colors.neutral.darkGray};
  max-width: 600px;
  margin: 0 auto ${props => props.theme.spacing['2xl']};
  line-height: 1.6;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: ${props => props.theme.typography.fontSize.md};
  }
`;

const CTAButtons = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  justify-content: center;
  margin-bottom: ${props => props.theme.spacing['3xl']};
  
  @media (max-width: 576px) {
    flex-direction: column;
    align-items: center;
    gap: ${props => props.theme.spacing.sm};
    
    button {
      width: 100%;
      max-width: 280px;
    }
  }
`;

const ScrollIndicator = styled(animated.div)`
  position: absolute;
  bottom: ${props => props.theme.spacing.xl};
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  color: ${props => props.theme.colors.neutral.gray};
  
  span {
    font-size: ${props => props.theme.typography.fontSize.sm};
    margin-bottom: ${props => props.theme.spacing.xs};
  }
  
  &::after {
    content: '';
    width: 2px;
    height: 30px;
    background: ${props => props.theme.colors.primary.main};
    border-radius: 1px;
    animation: bounce 2s infinite;
  }
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }
`;

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const mousePosition = useMousePosition();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // フローティング要素のアニメーション
  const floatingElements = [
    { 
      id: 1, 
      size: 60, 
      color: '#6C63FF30',
      initialX: 10,
      initialY: 20 
    },
    { 
      id: 2, 
      size: 80, 
      color: '#FF658420',
      initialX: 80,
      initialY: 10 
    },
    { 
      id: 3, 
      size: 40, 
      color: '#8F89FF40',
      initialX: 70,
      initialY: 80 
    },
    { 
      id: 4, 
      size: 100, 
      color: '#FF89A115',
      initialX: 20,
      initialY: 70 
    }
  ];

  return (
    <HeroContainer id="hero">
      <BackgroundElements>
        {floatingElements.map((element) => (
          <FloatingElement 
            key={element.id}
            element={element}
            mousePosition={mousePosition}
          />
        ))}
      </BackgroundElements>
      
      <ContentContainer>
        <ParallaxEffect speed={-0.1}>
          <FadeIn delay={200}>
            <MainTitle>
              Portfolio
            </MainTitle>
          </FadeIn>
        </ParallaxEffect>
        
        <FadeIn delay={400}>
          <Subtitle>
            <TypewriterEffect 
              text="マーケター & 生成AIプロンプトエンジニア"
              speed={80}
              delay={800}
            />
          </Subtitle>
        </FadeIn>
        
        <FadeIn delay={1500}>
          <Description>
            マーケティングコンサルタント×プログラム初心者が、
            AIを活用して様々なDXツールをリリース。
            従来の枠を超えた新しいデジタルソリューションで、
            ビジネスの可能性を広げます。
          </Description>
        </FadeIn>
        
        <FadeIn delay={2000}>
          <CTAButtons>
            <Button 
              variant="primary" 
              size="large"
              onClick={scrollToProjects}
            >
              作品を見る
            </Button>
            <Button 
              variant="outline" 
              size="large"
              onClick={scrollToContact}
            >
              お問い合わせ
            </Button>
          </CTAButtons>
        </FadeIn>
      </ContentContainer>
    </HeroContainer>
  );
};

// フローティング要素コンポーネント
const FloatingElement = ({ element, mousePosition }) => {
  const floatingAnimation = useSpring({
    transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
    config: { tension: 120, friction: 14 }
  });

  return (
    <FloatingShape
      style={{
        ...floatingAnimation,
        width: `${element.size}px`,
        height: `${element.size}px`,
        left: `${element.initialX}%`,
        top: `${element.initialY}%`,
      }}
      $color={element.color}
    />
  );
};

export default Hero;