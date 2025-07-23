import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from '@react-spring/web';

const ImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  background-color: ${props => props.theme.colors.neutral.lightGray};
  border-radius: ${props => props.$borderRadius || '0'};
`;

const PlaceholderDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(90deg, 
    ${props => props.theme.colors.neutral.lightGray} 25%, 
    ${props => props.theme.colors.neutral.lightGray}50 50%, 
    ${props => props.theme.colors.neutral.lightGray} 75%
  );
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  
  @keyframes loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
`;

const PlaceholderText = styled.span`
  color: ${props => props.theme.colors.neutral.gray};
  font-size: ${props => props.theme.typography.fontSize.sm};
`;

const StyledImage = styled(animated.img)`
  width: 100%;
  height: 100%;
  object-fit: ${props => props.$objectFit || 'cover'};
  display: block;
`;

const LazyImage = ({ 
  src, 
  alt, 
  placeholder = '読み込み中...',
  objectFit = 'cover',
  borderRadius,
  className,
  style,
  onLoad,
  onError,
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);
  const containerRef = useRef(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(container);
        }
      },
      {
        rootMargin: '50px' // Start loading 50px before the image comes into view
      }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  const imageAnimation = useSpring({
    opacity: isLoaded && !hasError ? 1 : 0,
    config: { tension: 200, friction: 20 }
  });

  const placeholderAnimation = useSpring({
    opacity: !isLoaded || hasError ? 1 : 0,
    config: { tension: 200, friction: 20 }
  });

  const handleLoad = (e) => {
    setIsLoaded(true);
    onLoad?.(e);
  };

  const handleError = (e) => {
    setHasError(true);
    setIsLoaded(false);
    onError?.(e);
  };

  return (
    <ImageContainer 
      ref={containerRef}
      className={className}
      style={style}
      $borderRadius={borderRadius}
      {...props}
    >
      {isInView && (
        <>
          <StyledImage
            ref={imgRef}
            src={src}
            alt={alt}
            style={imageAnimation}
            $objectFit={objectFit}
            onLoad={handleLoad}
            onError={handleError}
            loading="lazy" // Native lazy loading as fallback
          />
          <animated.div style={placeholderAnimation}>
            <PlaceholderDiv>
              <PlaceholderText>
                {hasError ? '画像を読み込めませんでした' : placeholder}
              </PlaceholderText>
            </PlaceholderDiv>
          </animated.div>
        </>
      )}
      {!isInView && (
        <PlaceholderDiv>
          <PlaceholderText>{placeholder}</PlaceholderText>
        </PlaceholderDiv>
      )}
    </ImageContainer>
  );
};

export default LazyImage;