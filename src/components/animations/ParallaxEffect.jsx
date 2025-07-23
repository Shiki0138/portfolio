import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const ParallaxContainer = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
`;

const ParallaxElement = styled.div`
  transform: translateY(${props => props.$offset}px);
  transition: transform 0.1s ease-out;
  will-change: transform;
`;

const ParallaxEffect = ({ 
  children, 
  speed = 0.5,
  offset = 0,
  disabled = false 
}) => {
  const [scrollY, setScrollY] = useState(0);
  const [elementTop, setElementTop] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);
  const ref = React.useRef(null);

  useEffect(() => {
    if (disabled) return;

    const element = ref.current;
    if (!element) return;

    const onScroll = () => {
      const rect = element.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setScrollY(scrollTop);
      setElementTop(rect.top + scrollTop);
      setClientHeight(window.innerHeight);
    };

    const onResize = () => {
      setClientHeight(window.innerHeight);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [disabled]);

  const calculateOffset = () => {
    if (disabled) return 0;
    
    const screenCenter = scrollY + clientHeight / 2;
    const elementCenter = elementTop + offset;
    const scrollOffset = screenCenter - elementCenter;
    
    return scrollOffset * speed;
  };

  return (
    <ParallaxContainer ref={ref}>
      <ParallaxElement $offset={calculateOffset()}>
        {children}
      </ParallaxElement>
    </ParallaxContainer>
  );
};

export default ParallaxEffect;