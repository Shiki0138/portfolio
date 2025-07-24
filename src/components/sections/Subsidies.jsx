import React from 'react';
import styled from 'styled-components';
import FadeIn from '../animations/FadeIn';
import Button from '../ui/Button';

const SubsidiesContainer = styled.section`
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
  width: 100%;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 0 ${props => props.theme.spacing.md};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 0 ${props => props.theme.spacing.sm};
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
  max-width: 800px;
  margin: 0 auto ${props => props.theme.spacing['2xl']};
  line-height: 1.6;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.xl};
  margin-bottom: ${props => props.theme.spacing['2xl']};
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.lg};
  }
`;

const SubsidyCard = styled.div`
  background: ${props => props.theme.colors.neutral.white};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.xl};
  box-shadow: ${props => props.theme.shadows.md};
  border: 2px solid transparent;
  transition: ${props => props.theme.transitions.standard};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.lg};
    border-color: ${props => props.theme.colors.primary.main}20;
  }
`;

const CardTitle = styled.h3`
  font-size: ${props => props.theme.typography.fontSize['2xl']};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.primary.main};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const CardDescription = styled.p`
  color: ${props => props.theme.colors.neutral.darkGray};
  line-height: 1.6;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: ${props => props.theme.spacing.lg};
  
  li {
    position: relative;
    padding-left: ${props => props.theme.spacing.lg};
    margin-bottom: ${props => props.theme.spacing.sm};
    color: ${props => props.theme.colors.neutral.darkGray};
    line-height: 1.5;
    
    &::before {
      content: '✓';
      position: absolute;
      left: 0;
      top: 0;
      color: ${props => props.theme.colors.primary.main};
      font-weight: bold;
    }
  }
`;

const CTASection = styled.div`
  text-align: center;
  background: ${props => props.theme.colors.neutral.white};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing['2xl']};
  box-shadow: ${props => props.theme.shadows.md};
`;

const CTATitle = styled.h3`
  font-size: ${props => props.theme.typography.fontSize['2xl']};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.neutral.black};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const CTADescription = styled.p`
  color: ${props => props.theme.colors.neutral.darkGray};
  line-height: 1.6;
  margin-bottom: ${props => props.theme.spacing.lg};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const Subsidies = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <SubsidiesContainer id="subsidies">
      <Container>
        <FadeIn>
          <SectionTitle>補助金・助成金サポート</SectionTitle>
          <SectionSubtitle>
            システム開発と合わせて、各種補助金・助成金の申請サポートも承ります。
            デジタル化推進による業務効率化を、資金面からも支援いたします。
          </SectionSubtitle>
        </FadeIn>

        <FadeIn delay={200}>
          <ContentGrid>
            <SubsidyCard>
              <CardTitle>IT導入補助金</CardTitle>
              <CardDescription>
                中小企業・小規模事業者のITツール導入による業務効率化・売上向上を支援する補助金です。
              </CardDescription>
              <FeatureList>
                <li>補助金額：最大450万円</li>
                <li>補助率：1/2以内</li>
                <li>ソフトウェア費、導入関連費等が対象</li>
                <li>申請書作成から交付申請まで全面サポート</li>
              </FeatureList>
            </SubsidyCard>

            <SubsidyCard>
              <CardTitle>事業再構築補助金</CardTitle>
              <CardDescription>
                新分野展開、業態転換、事業・業種転換、事業再編等の取り組みを支援する補助金です。
              </CardDescription>
              <FeatureList>
                <li>補助金額：最大1億円</li>
                <li>補助率：中小企業2/3、中堅企業1/2</li>
                <li>デジタル化による事業転換が対象</li>
                <li>事業計画策定から申請まで包括サポート</li>
              </FeatureList>
            </SubsidyCard>

            <SubsidyCard>
              <CardTitle>ものづくり補助金</CardTitle>
              <CardDescription>
                中小企業・小規模事業者の革新的なサービス開発・試作品開発・生産プロセスの改善を支援します。
              </CardDescription>
              <FeatureList>
                <li>補助金額：最大1,250万円</li>
                <li>補助率：中小企業1/2、小規模事業者2/3</li>
                <li>システム開発・導入費用が対象</li>
                <li>技術的な観点からの申請書類作成支援</li>
              </FeatureList>
            </SubsidyCard>
          </ContentGrid>
        </FadeIn>

        <FadeIn delay={400}>
          <CTASection>
            <CTATitle>補助金申請 + システム開発の一括提案</CTATitle>
            <CTADescription>
              システム開発の企画段階から補助金申請をセットで提案いたします。
              資金調達から開発・導入まで、ワンストップでサポートし、
              お客様の負担を最小限に抑えながらDXを実現します。
            </CTADescription>
            <Button 
              variant="primary" 
              size="large"
              onClick={scrollToContact}
            >
              補助金相談・お問い合わせ
            </Button>
          </CTASection>
        </FadeIn>
      </Container>
    </SubsidiesContainer>
  );
};

export default Subsidies;