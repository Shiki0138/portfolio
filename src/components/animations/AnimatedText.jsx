import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import styled from 'styled-components';

const TextContainer = styled.div`
  overflow: hidden;
  display: inline-block;
`;

const AnimatedSpan = styled(animated.span)`
  display: inline-block;
`;

const AnimatedText = ({ 
  children, 
  delay = 0,
  duration = 800,
  stagger = 100,
  triggerOnce = true,
  type = 'word' // 'word' or 'char'
}) => {
  const { ref, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce
  });

  const splitText = () => {
    if (typeof children !== 'string') return [children];
    
    if (type === 'char') {
      return children.split('');
    } else {
      return children.split(' ');
    }
  };

  const textElements = splitText();

  return (
    <TextContainer ref={ref}>
      {textElements.map((element, index) => (
        <AnimatedTextElement
          key={index}
          delay={delay + (index * stagger)}
          duration={duration}
          hasIntersected={hasIntersected}
        >
          {element}
          {type === 'word' && index < textElements.length - 1 && ' '}
        </AnimatedTextElement>
      ))}
    </TextContainer>
  );
};

const AnimatedTextElement = ({ children, delay, duration, hasIntersected }) => {
  const animation = useSpring({
    from: {
      opacity: 0,
      transform: 'translateY(20px) rotateX(-90deg)',
    },
    to: {
      opacity: hasIntersected ? 1 : 0,
      transform: hasIntersected ? 'translateY(0) rotateX(0deg)' : 'translateY(20px) rotateX(-90deg)',
    },
    delay,
    config: {
      duration
    }
  });

  return <AnimatedSpan style={animation}>{children}</AnimatedSpan>;
};

export default AnimatedText;