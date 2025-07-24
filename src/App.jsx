import React, { Suspense } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import Layout from './components/layout/Layout';
import LoadingSpinner from './components/ui/LoadingSpinner';

// コード分割による最適化
const Hero = React.lazy(() => import('./components/sections/Hero'));
const Projects = React.lazy(() => import('./components/sections/Projects'));
const Subsidies = React.lazy(() => import('./components/sections/Subsidies'));
const Contact = React.lazy(() => import('./components/sections/Contact'));

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Layout>
        <Suspense fallback={<LoadingSpinner text="ページを読み込み中..." />}>
          <Hero />
        </Suspense>
        <Suspense fallback={<LoadingSpinner text="プロジェクトを読み込み中..." />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<LoadingSpinner text="補助金情報を読み込み中..." />}>
          <Subsidies />
        </Suspense>
        <Suspense fallback={<LoadingSpinner text="お問い合わせフォームを読み込み中..." />}>
          <Contact />
        </Suspense>
      </Layout>
    </ThemeProvider>
  );
}

export default App;