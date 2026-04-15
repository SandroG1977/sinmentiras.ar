import styled from 'styled-components';
import VeredictViewer from '../VeredictViewer';
import EvidenceViewer from '../EvidenceViewer';

const ResolutionView = ({ result }) => {
  if (!result) return null;

  return (
    <Wrapper>
      <Grid>
        <VeredictViewer result={result} />
        <EvidenceViewer result={result} />
      </Grid>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 80rem;
  margin: 3rem auto 0;
  padding: 0 1.5rem 8rem;

  @media (max-width: 768px) {
    margin-top: 1.5rem;
    padding: 0 1rem 4rem;
  }
`;

const Grid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;

  @media (min-width: 1024px) {
    flex-direction: row;
  }

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

export default ResolutionView;
