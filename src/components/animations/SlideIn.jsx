import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const SlideIn = ({ 
  children, 
  delay = 0,
  duration = 700,
  from = 'left',
  distance = 100,
  triggerOnce = true,
  threshold = 0.1
}) => {
  const { ref, hasIntersected } = useIntersectionObserver({
    threshold,
    triggerOnce
  });

  const getInitialTransform = () => {
    switch (from) {
      case 'left':
        return `translateX(-${distance}px)`;
      case 'right':
        return `translateX(${distance}px)`;
      case 'top':
        return `translateY(-${distance}px)`;
      case 'bottom':
        return `translateY(${distance}px)`;
      default:
        return 'translateX(0)';
    }
  };

  const animation = useSpring({
    from: {
      opacity: 0,
      transform: getInitialTransform()
    },
    to: {
      opacity: hasIntersected ? 1 : 0,
      transform: hasIntersected ? 'translate(0)' : getInitialTransform()
    },
    delay,
    config: {
      duration,
      tension: 280,
      friction: 60
    }
  });

  return (
    <div ref={ref} style={{ width: '100%' }}>
      <animated.div style={animation}>
        {children}
      </animated.div>
    </div>
  );
};

export default SlideIn;