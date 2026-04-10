import styled from 'styled-components';

const Cell = styled.td`
  padding: 1rem 1.5rem;
`;

const InfractionsWrap = styled.div`
  display: flex;
  gap: 1rem;
`;

const InfractionLabel = styled.p`
  color: rgb(100, 116, 139);
  font-size: 0.75rem;
`;

const InfractionValue = styled.p`
  color: white;
  font-weight: 700;
`;

const Infractions = ({ lies, omisions }) => (
  <Cell>
    <InfractionsWrap>
      <div>
        <InfractionLabel>Mentiras</InfractionLabel>
        <InfractionValue>{lies}</InfractionValue>
      </div>
      <div>
        <InfractionLabel>Omisiones</InfractionLabel>
        <InfractionValue>{omisions}</InfractionValue>
      </div>
    </InfractionsWrap>
  </Cell>
);

export default Infractions;
