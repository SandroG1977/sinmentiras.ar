import styled from 'styled-components';

const CardContainer = styled.div`
  display: flex;
  gap: 2.5rem;
  align-items: flex-start;
  padding: 2.5rem;
  border-radius: 2.5rem;
  border: 1px solid;
  transition: all 0.3s ease;

  ${(props) =>
    props.active
      ? `
        background: rgba(59, 130, 246, 0.05);
        border-color: rgba(59, 130, 246, 0.3);
        box-shadow: 0 25px 50px -12px rgba(59, 130, 246, 0.1);
        `
      : `
        background: rgb(15, 23, 42);
        border-color: rgba(255, 255, 255, 0.05);
        opacity: 0.5;
        filter: grayscale(100%);
    `}
`;

const StepNumber = styled.span`
  font-size: 3rem;
  font-weight: 900;
  font-style: italic;
  letter-spacing: -0.025em;
  color: ${(props) =>
    props.active ? 'rgb(59, 130, 246)' : 'rgb(71, 85, 105)'};
  flex-shrink: 0;
`;

const ContentContainer = styled.div`
  flex: 1;
`;

const Title = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
  letter-spacing: -0.025em;
`;

const Description = styled.p`
  color: rgb(148, 163, 184);
  font-weight: 500;
  line-height: 1.625;
`;

const ActiveBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
  color: rgb(59, 130, 246);
  font-weight: 900;
  font-size: 0.625rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

const PulsingDot = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  background: rgb(59, 130, 246);
  border-radius: 50%;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;

const RoadmapPhaseCard = ({ step, title, description, active }) => (
  <CardContainer active={active}>
    <StepNumber active={active}>{step}</StepNumber>
    <ContentContainer>
      <Title>{title}</Title>
      <Description>{description}</Description>
      {active && (
        <ActiveBadge>
          <PulsingDot />
          Fase de Despliegue Activa
        </ActiveBadge>
      )}
    </ContentContainer>
  </CardContainer>
);

export default RoadmapPhaseCard;
