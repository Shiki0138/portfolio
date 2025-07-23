import React, { useState } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';

const Container = styled.div`
  position: relative;
  height: 400px;
  width: 100%;
  max-width: 400px;
  margin: 0 auto 60px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 350px;
    max-width: 350px;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    height: 300px;
    max-width: 300px;
  }
`;

const CardWrapper = styled(animated.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  will-change: transform;
  cursor: grab;
  
  &:active {
    cursor: grabbing;
  }
`;

const Card = styled.div`
  background: ${({ theme }) => theme.colors.neutral.white};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 120px;
    background: ${({ $color }) => $color || '#6C63FF'};
    opacity: 0.1;
  }
`;

const CardHeader = styled.div`
  position: relative;
  z-index: 1;
`;

const CardTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.neutral.black};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const CardDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${({ theme }) => theme.colors.neutral.darkGray};
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Tag = styled.span`
  background: ${({ theme }) => theme.colors.primary.light};
  color: ${({ theme }) => theme.colors.neutral.white};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ViewButton = styled.button`
  background: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.neutral.white};
  border: none;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary.dark};
    transform: translateY(-2px);
  }
`;

const CardIndicator = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ active, theme }) => 
    active ? theme.colors.primary.main : theme.colors.neutral.lightGray};
  transition: background 0.3s ease;
`;

const CardStack = ({ projects, onViewProject }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [gone] = useState(() => new Set());

  const [props, api] = useSpring(() => ({
    x: 0,
    y: 0,
    rot: 0,
    scale: 1,
    from: { x: 0, y: 0, rot: 0, scale: 1 },
  }));

  const bind = useDrag(({ active, movement: [mx], direction: [xDir], velocity: [vx] }) => {
    const trigger = vx > 0.2;
    const dir = xDir < 0 ? -1 : 1;
    
    if (!active && trigger) {
      gone.add(currentIndex);
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }
    
    api.start({
      x: active ? mx : trigger ? (200 + window.innerWidth) * dir : 0,
      rot: active ? mx / 10 : 0,
      scale: active ? 1.1 : 1,
      immediate: (name) => active && name === 'x',
      config: { friction: 50, tension: active ? 800 : trigger ? 200 : 500 },
      onRest: () => {
        if (trigger) {
          setTimeout(() => {
            gone.delete(currentIndex);
            api.start({ x: 0, rot: 0, scale: 1 });
          }, 100);
        }
      },
    });
  });

  const currentProject = projects[currentIndex];
  const colors = ['#6C63FF', '#FF6584', '#4CAF50', '#FF9800', '#9C27B0', '#2196F3'];
  const projectColor = colors[currentIndex % colors.length];

  return (
    <>
      <Container>
        <CardWrapper {...bind()} style={props}>
          <Card $color={projectColor}>
            <CardHeader>
              <CardTitle>{currentProject.title}</CardTitle>
              <CardDescription>{currentProject.description}</CardDescription>
              <TagContainer>
                {currentProject.tags.slice(0, 3).map((tag, index) => (
                  <Tag key={index}>{tag}</Tag>
                ))}
              </TagContainer>
            </CardHeader>
            <CardFooter>
              <ViewButton onClick={() => onViewProject(currentProject)}>
                詳細を見る
              </ViewButton>
            </CardFooter>
          </Card>
        </CardWrapper>
      </Container>
      <CardIndicator>
        {projects.map((_, index) => (
          <Dot key={index} active={index === currentIndex} />
        ))}
      </CardIndicator>
    </>
  );
};

export default CardStack;