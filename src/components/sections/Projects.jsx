import React, { useState } from 'react';
import styled from 'styled-components';
import { useTrail, animated } from '@react-spring/web';
import FadeIn from '../animations/FadeIn';
import Card from '../ui/Card';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import CardStack from '../ui/CardStack';
import { projects } from '../../data/projects';

const ProjectsContainer = styled.section`
  padding: ${props => props.theme.spacing['3xl']} 0;
  background-color: ${props => props.theme.colors.neutral.lightGray}20;
  width: 100%;
  overflow-x: hidden;
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
  max-width: 600px;
  margin: 0 auto ${props => props.theme.spacing['2xl']};
  line-height: 1.6;
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${props => props.theme.spacing.xl};
  margin-bottom: ${props => props.theme.spacing['2xl']};
  justify-content: center;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: ${props => props.theme.spacing.lg};
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.lg};
    padding: 0;
  }
`;

const ProjectCard = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: ${props => props.theme.borderRadius.md};
`;

const ProjectDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${props => props.theme.spacing.lg};
`;

const DetailSection = styled.div`
  h4 {
    color: ${props => props.theme.colors.primary.main};
    font-weight: ${props => props.theme.typography.fontWeight.bold};
    margin-bottom: ${props => props.theme.spacing.sm};
    font-size: ${props => props.theme.typography.fontSize.lg};
  }
  
  p, li {
    color: ${props => props.theme.colors.neutral.darkGray};
    line-height: 1.6;
    margin-bottom: ${props => props.theme.spacing.xs};
  }
  
  ul {
    padding-left: ${props => props.theme.spacing.md};
    
    li {
      list-style: disc;
    }
  }
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.xs};
`;

const TechTag = styled.span`
  background-color: ${props => props.theme.colors.primary.main};
  color: ${props => props.theme.colors.neutral.white};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.lg};
`;

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const trail = useTrail(projects.length, {
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { mass: 1, tension: 280, friction: 60 },
    delay: 200
  });

  const openModal = (project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <ProjectsContainer id="projects">
      <Container>
        <FadeIn>
          <SectionTitle>プロジェクト</SectionTitle>
          <SectionSubtitle>
            これまでに手がけた様々なプロジェクトをご紹介します。
            それぞれのプロジェクトで新しい技術に挑戦し、
            ユーザー体験の向上を追求してきました。
          </SectionSubtitle>
        </FadeIn>

        <FadeIn delay={300}>
          <CardStack 
            projects={projects} 
            onViewProject={openModal}
          />
        </FadeIn>

        <ProjectGrid>
          {trail.map((style, index) => (
            <animated.div key={projects[index].id} style={style}>
              <ProjectCard
                image={projects[index].image}
                title={projects[index].title}
                body={projects[index].description}
                tags={projects[index].tags}
                clickable
                onClick={() => openModal(projects[index])}
                footer={
                  <Button 
                    variant="primary" 
                    size="small"
                    onClick={() => openModal(projects[index])}
                  >
                    詳細を見る
                  </Button>
                }
              />
            </animated.div>
          ))}
        </ProjectGrid>

        {selectedProject && (
          <Modal
            isOpen={true}
            onClose={closeModal}
            title={selectedProject.title}
            maxWidth="800px"
          >
            <ModalContent>
              <ProjectImage 
                src={selectedProject.image} 
                alt={selectedProject.title} 
              />
              
              <p>{selectedProject.description}</p>
              
              <ProjectDetails>
                <DetailSection>
                  <h4>プロジェクト概要</h4>
                  <p><strong>役割:</strong> {selectedProject.details.role}</p>
                  <p><strong>期間:</strong> {selectedProject.details.duration}</p>
                </DetailSection>
                
                <DetailSection>
                  <h4>技術スタック</h4>
                  <TechStack>
                    {selectedProject.details.technologies.map((tech, index) => (
                      <TechTag key={index}>{tech}</TechTag>
                    ))}
                  </TechStack>
                </DetailSection>
              </ProjectDetails>
              
              <DetailSection>
                <h4>課題</h4>
                <p>{selectedProject.details.challenges}</p>
              </DetailSection>
              
              <DetailSection>
                <h4>解決方法</h4>
                <p>{selectedProject.details.solutions}</p>
              </DetailSection>
              
              <DetailSection>
                <h4>主な機能</h4>
                <ul>
                  {selectedProject.details.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </DetailSection>
              
              <ProjectLinks>
                {selectedProject.links.live && (
                  <Button 
                    variant="primary"
                    onClick={() => window.open(selectedProject.links.live, '_blank')}
                  >
                    ライブデモ
                  </Button>
                )}
                {selectedProject.links.github && (
                  <Button 
                    variant="outline"
                    onClick={() => window.open(selectedProject.links.github, '_blank')}
                  >
                    GitHub
                  </Button>
                )}
              </ProjectLinks>
            </ModalContent>
          </Modal>
        )}
      </Container>
    </ProjectsContainer>
  );
};

export default Projects;