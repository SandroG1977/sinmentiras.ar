import styled from 'styled-components';

const Cell = styled.td`
  padding: 1rem 1.5rem;
  text-align: right;
`;

const ScoreValue = styled.span`
  font-size: 1.75rem;
  font-weight: 900;
  font-style: italic;
  ${(props) => {
    if (props.$score > 80) return 'color: rgb(16, 185, 129);';
    if (props.$score > 40) return 'color: rgb(245, 158, 11);';
    return 'color: rgb(239, 68, 68);';
  }}
`;

const ScoreBase = styled.span`
  color: rgb(100, 116, 139);
  font-size: 0.875rem;
  margin-left: 0.2rem;
`;

const ScoreCell = ({ score }) => (
  <Cell>
    <ScoreValue $score={score}>{score}</ScoreValue>
    <ScoreBase>/100</ScoreBase>
  </Cell>
);

export default ScoreCell;
