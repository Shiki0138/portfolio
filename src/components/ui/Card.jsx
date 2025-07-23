import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from '@react-spring/web';

const StyledCard = styled(animated.div)`
  background-color: ${props => props.theme.colors.neutral.white};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.md};
  overflow: hidden;
  transition: all ${props => props.theme.transitions.normal};
  cursor: ${props => props.$clickable ? 'pointer' : 'default'};
  position: relative;
  
  &:hover {
    transform: ${props => props.$hoverable ? 'translateY(-4px)' : 'none'};
    box-shadow: ${props => props.$hoverable ? props.theme.shadows.lg : props.theme.shadows.md};
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: ${props => props.$height || '200px'};
  object-fit: cover;
  display: block;
`;

const CardContent = styled.div`
  padding: ${props => props.theme.spacing.lg};
`;

const CardHeader = styled.div`
  margin-bottom: ${props => props.theme.spacing.md};
`;

const CardTitle = styled.h3`
  color: ${props => props.theme.colors.neutral.black};
  margin-bottom: ${props => props.theme.spacing.xs};
  font-size: ${props => props.theme.typography.fontSize.xl};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
`;

const CardSubtitle = styled.p`
  color: ${props => props.theme.colors.neutral.gray};
  font-size: ${props => props.theme.typography.fontSize.sm};
  margin-bottom: 0;
`;

const CardBody = styled.div`
  color: ${props => props.theme.colors.neutral.darkGray};
  line-height: 1.6;
  
  p {
    margin-bottom: ${props => props.theme.spacing.sm};
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const CardFooter = styled.div`
  padding-top: ${props => props.theme.spacing.md};
  border-top: 1px solid ${props => props.theme.colors.neutral.lightGray};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${props => props.theme.spacing.sm};
`;

const CardTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.xs};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const Tag = styled.span`
  background-color: ${props => props.theme.colors.primary.main}20;
  color: ${props => props.theme.colors.primary.dark};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: ${props => props.theme.typography.fontSize.xs};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
`;

const Card = ({ 
  children, 
  image, 
  imageHeight,
  title, 
  subtitle, 
  body,
  footer,
  tags = [],
  hoverable = true,
  clickable = false,
  onClick,
  className,
  ...props 
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  
  const cardAnimation = useSpring({
    transform: isHovered && hoverable ? 'scale(1.02) translateY(-4px)' : 'scale(1) translateY(0)',
    boxShadow: isHovered && hoverable ? '0 12px 24px rgba(0,0,0,0.15)' : '0 4px 8px rgba(0,0,0,0.1)',
    config: { tension: 300, friction: 20 }
  });

  return (
    <StyledCard
      style={cardAnimation}
      $hoverable={hoverable}
      $clickable={clickable}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={className}
      {...props}
    >
      {image && (
        <CardImage src={image} alt={title} $height={imageHeight} />
      )}
      
      <CardContent>
        {(title || subtitle) && (
          <CardHeader>
            {title && <CardTitle>{title}</CardTitle>}
            {subtitle && <CardSubtitle>{subtitle}</CardSubtitle>}
          </CardHeader>
        )}
        
        {tags.length > 0 && (
          <CardTags>
            {tags.map((tag, index) => (
              <Tag key={index}>{tag}</Tag>
            ))}
          </CardTags>
        )}
        
        {body && <CardBody>{body}</CardBody>}
        {children}
        
        {footer && <CardFooter>{footer}</CardFooter>}
      </CardContent>
    </StyledCard>
  );
};

export default Card;