import styled from 'styled-components';

const Tag = styled.span`
  padding: 0.5rem 1.25rem;
  background: rgba(245, 158, 11, 0.1);
  color: ${({ color }) => {
    switch (color) {
      case 'VERDADERO':
        return '#22c55e';
      case 'FALSO':
        return '#ef4444';
      default:
        return '#f59e0b';
    }
  }};
  font-size: 11px;
  font-weight: 900;
  border-radius: 9999px;
  border: 1px solid rgba(245, 158, 11, 0.2);
  text-transform: uppercase;
  letter-spacing: 0.2em;
`;

const VeredictTag = ({ result }) => {
  if (!result) return null;

  return <Tag color={result}>{result}</Tag>;
};

export default VeredictTag;
