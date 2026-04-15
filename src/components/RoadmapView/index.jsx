import styled from 'styled-components';
import RoadmapPhaseCard from '../RoadmapPhaseCard';

const Container = styled.div`
  max-width: 56rem;
  margin: 5rem auto;
  padding: 0 1.5rem 10rem;

  @media (max-width: 768px) {
    margin: 2rem auto;
    padding: 0 1rem 4rem;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 5rem;

  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const Title = styled.h2`
  font-size: 2.25rem;
  font-weight: 900;
  color: white;
  margin-bottom: 1rem;
  letter-spacing: -0.025em;
  text-transform: uppercase;
  font-style: italic;

  @media (max-width: 768px) {
    font-size: clamp(1.5rem, 8vw, 1.95rem);
  }
`;

const Subtitle = styled.p`
  color: rgb(100, 116, 139);
  font-weight: 500;
`;

const PhasesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const PHASES = [
  {
    step: '01',
    title: 'Auditoría de Fuentes Públicas',
    desc: 'Motor de búsqueda conectado al BORA y al Congreso. Foco en integridad documental.',
    active: true,
  },
  {
    step: '02',
    title: 'Repositorio de Inconsistencias',
    desc: 'Base de datos histórica de discrepancias detectadas por la IA.',
    active: false,
  },
  {
    step: '03',
    title: 'Ranking de Veracidad',
    desc: 'Score algorítmico basado en la recurrencia de desvíos técnicos sobre textos oficiales.',
    active: false,
  },
  {
    step: '04',
    title: 'Open Data API',
    desc: 'Apertura de nuestra base de datos para investigadores y otros medios.',
    active: false,
  },
];

const RoadmapView = () => (
  <Container>
    <Header>
      <Title>Plan de Transparencia</Title>
      <Subtitle>
        De auditoría individual a un índice nacional de integridad pública.
      </Subtitle>
    </Header>

    <PhasesContainer>
      {PHASES.map((phase, i) => (
        <RoadmapPhaseCard
          key={i}
          step={phase.step}
          title={phase.title}
          description={phase.desc}
          active={phase.active}
        />
      ))}
    </PhasesContainer>
  </Container>
);

export default RoadmapView;
