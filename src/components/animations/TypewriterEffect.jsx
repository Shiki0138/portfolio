import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const TypewriterText = styled.span`
  &::after {
    content: '${props => props.$showCursor ? '|' : ''}';
    animation: ${props => props.$showCursor ? 'blink 1s infinite' : 'none'};
  }

  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }
`;

const TypewriterEffect = ({ 
  text, 
  speed = 100, 
  delay = 0, 
  showCursor = true,
  onComplete = () => {}
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const startTyping = setTimeout(() => {
      setIsTyping(true);
    }, delay);

    return () => clearTimeout(startTyping);
  }, [delay]);

  useEffect(() => {
    if (!isTyping || currentIndex >= text.length) {
      if (currentIndex >= text.length) {
        onComplete();
      }
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayText(prev => prev + text[currentIndex]);
      setCurrentIndex(prev => prev + 1);
    }, speed);

    return () => clearTimeout(timeout);
  }, [currentIndex, isTyping, text, speed, onComplete]);

  return (
    <TypewriterText $showCursor={showCursor && currentIndex < text.length}>
      {displayText}
    </TypewriterText>
  );
};

export default TypewriterEffect;