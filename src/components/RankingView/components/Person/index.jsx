import styled from 'styled-components';
import { User } from 'lucide-react';

const Cell = styled.td`
  padding: 1rem 1.5rem;
`;

const PersonWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const Avatar = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
  background: rgb(30, 41, 59);
  color: rgb(148, 163, 184);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Name = styled.p`
  color: white;
  font-weight: 700;
`;

const Role = styled.p`
  color: rgb(100, 116, 139);
  font-size: 0.75rem;
`;

const Person = ({ name, role }) => (
  <Cell>
    <PersonWrap>
      <Avatar>
        <User size={18} />
      </Avatar>
      <div>
        <Name>{name}</Name>
        <Role>{role}</Role>
      </div>
    </PersonWrap>
  </Cell>
);

export default Person;
