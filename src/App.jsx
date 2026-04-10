import styled from 'styled-components';
import { useState } from 'react';
import Nav from './components/Nav';
import HomeView from './components/HomeView';
import RoadmapView from './components/RoadmapView';
import RankingView from './components/RankingView';
import Foot from './components/Foot';
import ResolutionView from './components/ResolutionViewer';
import MOCK_RESOLUTION from './datos/mocked_resolution';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, rgb(15, 23, 42) 0%, rgb(30, 41, 59) 100%);
  padding: 0;
  margin: 0;
`;

const H1 = styled.h1`
  font-size: 2.25rem;
  font-weight: 900;
  color: white;
  margin: 1.5rem 0;
  letter-spacing: -0.025em;
  text-transform: uppercase;
  font-style: italic;
  text-align: center;
  padding: 0 2rem;
`;

const ContentContainer = styled.div`
  padding: 2rem;
`;

const App = () => {
  const [view, setView] = useState('home');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSearch = (searchText) => {
    const normalizedQuery = searchText.trim();
    if (!normalizedQuery) return;

    setQuery(normalizedQuery);

    setLoading(true);
    setTimeout(() => {
      setResult(MOCK_RESOLUTION);
      setLoading(false);
      setView('resolution');
    }, 1200);
  };

  return (
    <AppContainer>
      <Nav view={view} setView={setView} />
      <ContentContainer>
        {view === 'home' && (
          <HomeView
            query={query}
            handleSearch={handleSearch}
            isLoading={loading}
          />
        )}

        {view === 'resolution' && result && <ResolutionView result={result} />}

        {view === 'roadmap' && <RoadmapView />}

        {view === 'ranking' && <RankingView />}
      </ContentContainer>
      <Foot />
    </AppContainer>
  );
};

export default App;
