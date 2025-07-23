import React, { useState } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from '@react-spring/web';
import FadeIn from '../animations/FadeIn';
import SlideIn from '../animations/SlideIn';
import Button from '../ui/Button';

const ContactContainer = styled.section`
  padding: ${props => props.theme.spacing['3xl']} 0;
  background: linear-gradient(135deg, 
    ${props => props.theme.colors.primary.main}05 0%, 
    ${props => props.theme.colors.secondary.main}05 100%
  );
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.lg};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 0 ${props => props.theme.spacing.md};
  }
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: ${props => props.theme.typography.fontSize['4xl']};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.neutral.black};
  margin-bottom: ${props => props.theme.spacing.lg};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: ${props => props.theme.typography.fontSize['3xl']};
  }
`;

const SectionSubtitle = styled.p`
  text-align: center;
  font-size: ${props => props.theme.typography.fontSize.lg};
  color: ${props => props.theme.colors.neutral.darkGray};
  max-width: 600px;
  margin: 0 auto ${props => props.theme.spacing['2xl']};
  line-height: 1.6;
`;

const ContactContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing['3xl']};
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing['2xl']};
  }
`;

const ContactForm = styled(animated.form)`
  background: ${props => props.theme.colors.neutral.white};
  padding: ${props => props.theme.spacing['2xl']};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.lg};
`;

const FormGroup = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const Label = styled.label`
  display: block;
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.theme.colors.neutral.black};
  margin-bottom: ${props => props.theme.spacing.sm};
  font-size: ${props => props.theme.typography.fontSize.md};
`;

const Input = styled.input`
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  border: 2px solid ${props => props.theme.colors.neutral.lightGray};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.typography.fontSize.md};
  transition: ${props => props.theme.transitions.normal};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary.main};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary.main}20;
  }
  
  &::placeholder {
    color: ${props => props.theme.colors.neutral.gray};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  border: 2px solid ${props => props.theme.colors.neutral.lightGray};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.typography.fontSize.md};
  min-height: 120px;
  resize: vertical;
  font-family: inherit;
  transition: ${props => props.theme.transitions.normal};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary.main};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary.main}20;
  }
  
  &::placeholder {
    color: ${props => props.theme.colors.neutral.gray};
  }
`;

const ErrorMessage = styled.span`
  color: ${props => props.theme.colors.error};
  font-size: ${props => props.theme.typography.fontSize.sm};
  margin-top: ${props => props.theme.spacing.xs};
  display: block;
`;

const SuccessMessage = styled.div`
  background: ${props => props.theme.colors.success}20;
  color: ${props => props.theme.colors.success};
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  margin-bottom: ${props => props.theme.spacing.lg};
  text-align: center;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xl};
`;

const InfoCard = styled.div`
  background: ${props => props.theme.colors.neutral.white};
  padding: ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.md};
  text-align: center;
`;

const InfoIcon = styled.div`
  font-size: ${props => props.theme.typography.fontSize['3xl']};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const InfoTitle = styled.h3`
  font-size: ${props => props.theme.typography.fontSize.xl};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.neutral.black};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const InfoText = styled.p`
  color: ${props => props.theme.colors.neutral.darkGray};
  line-height: 1.6;
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.lg};
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: ${props => props.theme.colors.primary.main};
  color: ${props => props.theme.colors.neutral.white};
  border-radius: ${props => props.theme.borderRadius.full};
  text-decoration: none;
  font-size: ${props => props.theme.typography.fontSize.xl};
  transition: all ${props => props.theme.transitions.normal};
  
  &:hover {
    background: ${props => props.theme.colors.primary.dark};
    transform: translateY(-3px);
  }
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formAnimation = useSpring({
    transform: isSubmitting ? 'scale(0.98)' : 'scale(1)',
    config: { tension: 300, friction: 20 }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // エラーをクリア
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'お名前を入力してください';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'メールアドレスを入力してください';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '有効なメールアドレスを入力してください';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'メッセージを入力してください';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Google Apps Scriptエンドポイントに送信
      const response = await fetch('https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          timestamp: new Date().toISOString()
        })
      });
      
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      
      // 成功メッセージを5秒後に隐す
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
      
    } catch (error) {
      console.error('送信エラー:', error);
      setIsSubmitting(false);
      setErrors({ submit: '送信に失敗しました。しばらく後でもう一度お試しください。' });
    }
  };

  return (
    <ContactContainer id="contact">
      <Container>
        <FadeIn>
          <SectionTitle>お問い合わせ</SectionTitle>
          <SectionSubtitle>
            プロジェクトのご相談やご質問など、お気軽にお問い合わせください。
            24時間以内にご返信いたします。
          </SectionSubtitle>
        </FadeIn>

        <ContactContent>
          <SlideIn from="left">
            <ContactForm style={formAnimation} onSubmit={handleSubmit}>
              {isSubmitted && (
                <SuccessMessage>
                  メッセージを送信しました！ありがとうございます。
                </SuccessMessage>
              )}
              
              {errors.submit && (
                <ErrorMessage style={{ 
                  display: 'block', 
                  textAlign: 'center', 
                  marginBottom: '1rem',
                  padding: '0.5rem',
                  backgroundColor: '#F4433620',
                  borderRadius: '4px'
                }}>
                  {errors.submit}
                </ErrorMessage>
              )}
              
              <FormGroup>
                <Label htmlFor="name">お名前 *</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="山田 太郎"
                />
                {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="email">メールアドレス *</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                />
                {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="message">メッセージ *</Label>
                <TextArea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="プロジェクトの詳細やご要望をお聞かせください..."
                />
                {errors.message && <ErrorMessage>{errors.message}</ErrorMessage>}
              </FormGroup>
              
              <Button 
                type="submit" 
                variant="primary" 
                size="large" 
                fullWidth
                disabled={isSubmitting}
              >
                {isSubmitting ? '送信中...' : 'メッセージを送信'}
              </Button>
            </ContactForm>
          </SlideIn>

          <SlideIn from="right">
            <ContactInfo>
              <InfoCard>
                <InfoIcon>📧</InfoIcon>
                <InfoTitle>メール</InfoTitle>
                <InfoText>contact@example.com</InfoText>
              </InfoCard>
              
              
              <InfoCard>
                <InfoIcon>📍</InfoIcon>
                <InfoTitle>所在地</InfoTitle>
                <InfoText>東京, 日本</InfoText>
              </InfoCard>
              
              <InfoCard>
                <InfoIcon>🌐</InfoIcon>
                <InfoTitle>SNS</InfoTitle>
                <InfoText>お気軽にフォローしてください</InfoText>
                <SocialLinks>
                  <SocialLink href="https://github.com" target="_blank" rel="noopener noreferrer">
                    📂
                  </SocialLink>
                  <SocialLink href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    💼
                  </SocialLink>
                  <SocialLink href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    🐦
                  </SocialLink>
                </SocialLinks>
              </InfoCard>
            </ContactInfo>
          </SlideIn>
        </ContactContent>
      </Container>
    </ContactContainer>
  );
};

export default Contact;