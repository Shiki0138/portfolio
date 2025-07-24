import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-x: hidden;
  position: relative;
`;

const MainContent = styled.main`
  flex: 1;
  padding-top: 80px; /* ヘッダーの高さ分 */
  width: 100%;
  overflow-x: hidden;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding-top: 70px;
  }
`;

const Layout = ({ children }) => {
  return (
    <LayoutContainer>
      <Header />
      <MainContent>
        {children}
      </MainContent>
      <Footer />
    </LayoutContainer>
  );
};

export default Layout;