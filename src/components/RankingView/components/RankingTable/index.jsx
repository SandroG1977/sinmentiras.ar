import styled from 'styled-components';
import Person from '../Person';
import Infractions from '../Infractions';
import ScoreCell from '../ScoreCell';

const Wrapper = styled.div`
  background: rgb(15, 23, 42);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 1.5rem;
  overflow-x: auto;
  overflow-y: hidden;
  box-shadow: 0 24px 50px rgba(0, 0, 0, 0.35);

  @media (max-width: 768px) {
    border-radius: 1rem;
  }
`;

const Table = styled.table`
  width: 100%;
  min-width: 720px;
  border-collapse: collapse;
`;

const Head = styled.thead`
  background: rgba(30, 41, 59, 0.5);
  color: rgb(148, 163, 184);
  font-size: 0.75rem;
  text-transform: uppercase;
`;

const HeaderCell = styled.th`
  padding: 1rem 1.5rem;
  text-align: ${(props) => (props.$alignRight ? 'right' : 'left')};
`;

const Body = styled.tbody`
  tr + tr {
    border-top: 1px solid rgba(255, 255, 255, 0.06);
  }
`;

const Row = styled.tr`
  transition: background 0.2s ease;

  &:hover {
    background: rgba(51, 65, 85, 0.25);
  }
`;

const Cell = styled.td`
  padding: 1rem 1.5rem;
`;

const Status = styled.span`
  font-size: 0.7rem;
  font-weight: 800;
  padding: 0.25rem 0.6rem;
  border-radius: 9999px;
  border: 1px solid;

  ${(props) => {
    if (props.$score > 80) {
      return `
        background: rgba(16, 185, 129, 0.12);
        color: rgb(16, 185, 129);
        border-color: rgba(16, 185, 129, 0.2);
      `;
    }

    if (props.$score > 40) {
      return `
        background: rgba(245, 158, 11, 0.12);
        color: rgb(245, 158, 11);
        border-color: rgba(245, 158, 11, 0.2);
      `;
    }

    return `
      background: rgba(239, 68, 68, 0.12);
      color: rgb(239, 68, 68);
      border-color: rgba(239, 68, 68, 0.2);
    `;
  }}
`;

const RankingTable = ({ people }) => (
  <Wrapper>
    <Table>
      <Head>
        <tr>
          <HeaderCell>Sujeto</HeaderCell>
          <HeaderCell>Estado</HeaderCell>
          <HeaderCell>Faltas</HeaderCell>
          <HeaderCell $alignRight>Score Integridad</HeaderCell>
        </tr>
      </Head>
      <Body>
        {people.map((person) => (
          <Row key={person.name}>
            <Person name={person.name} role={person.role} />
            <Cell>
              <Status $score={person.score}>{person.status}</Status>
            </Cell>
            <Infractions lies={person.lies} omisions={person.omisions} />
            <ScoreCell score={person.score} />
          </Row>
        ))}
      </Body>
    </Table>
  </Wrapper>
);

export default RankingTable;
