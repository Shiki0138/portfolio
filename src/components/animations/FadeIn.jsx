import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const FadeIn = ({ 
  children, 
  delay = 0, 
  duration = 500,
  direction = 'up',
  distance = 20,
  triggerOnce = true,
  threshold = 0.1
}) => {
  const { ref, hasIntersected } = useIntersectionObserver({
    threshold,
    triggerOnce
  });

  const directions = {
    up: `translateY(${distance}px)`,
    down: `translateY(-${distance}px)`,
    left: `translateX(${distance}px)`,
    right: `translateX(-${distance}px)`
  };

  const animation = useSpring({
    from: {
      opacity: 0,
      transform: directions[direction]
    },
    to: {
      opacity: hasIntersected ? 1 : 0,
      transform: hasIntersected ? 'translate(0px)' : directions[direction]
    },
    delay,
    config: {
      duration
    }
  });

  return (
    <div ref={ref}>
      <animated.div style={animation}>
        {children}
      </animated.div>
    </div>
  );
};

export default FadeIn;