import styled from 'styled-components';
import MOCK_RANKING from '../../datos/mocked_ranking';
import RankingTable from './components/RankingTable';

const Container = styled.div`
  max-width: 80rem;
  margin: 4rem auto;
  padding: 0 1.5rem 6rem;

  @media (max-width: 768px) {
    margin: 2rem auto;
    padding: 0 1rem 3rem;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    flex-direction: column;
    margin-bottom: 1.5rem;
  }
`;

const Title = styled.h2`
  font-size: 2.25rem;
  font-weight: 900;
  color: white;
  margin-bottom: 0.5rem;
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: clamp(1.4rem, 8vw, 1.9rem);
  }
`;

const Subtitle = styled.p`
  color: rgb(148, 163, 184);
`;

const MetaLabel = styled.span`
  color: rgb(100, 116, 139);
  font-size: 0.75rem;
  text-transform: uppercase;
  display: block;
  margin-bottom: 0.25rem;
`;

const MetaValue = styled.span`
  font-size: 0.875rem;
  color: white;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  background: rgb(30, 41, 59);
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.08);
`;

const RankingView = () => (
  <Container>
    <Header>
      <div>
        <Title>Ranking Nacional de Veracidad</Title>
        <Subtitle>
          Índice de Consistencia Normativa (ICN) basado en datos históricos y
          réplicas aceptadas.
        </Subtitle>
      </div>
      <div>
        <MetaLabel>Última actualización</MetaLabel>
        <MetaValue>Hace 14 minutos</MetaValue>
      </div>
    </Header>

    <RankingTable people={MOCK_RANKING} />
  </Container>
);

export default RankingView;
