import styled from 'styled-components';
import { Scale, Globe } from 'lucide-react';

const NavBar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 2.5rem;
  background: rgba(20, 28, 48, 0.5);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  position: sticky;
  top: 0;
  z-index: 50;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const LogoIcon = styled.div`
  background: rgb(37, 99, 235);
  padding: 0.375rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoText = styled.span`
  font-size: 1.25rem;
  font-weight: 900;
  letter-spacing: -0.025em;
  color: white;
  text-transform: uppercase;
  font-style: italic;

  span {
    color: rgb(59, 130, 246);
  }
`;

const NavMenu = styled.div`
  display: none;
  gap: 2rem;
  font-size: 0.6875rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: rgb(100, 116, 139);

  @media (min-width: 768px) {
    display: flex;
  }
`;

const NavButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => (props.$active ? 'white' : 'rgb(100, 116, 139)')};
  cursor: pointer;
  transition: color 0.3s;
  font-size: 0.6875rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  padding-bottom: 0.25rem;
  ${(props) =>
    props.$active ? 'border-bottom: 2px solid rgb(59, 130, 246);' : ''}

  &:hover {
    color: white;
  }
`;

const InfoBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgb(15, 23, 42);
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

const IconWrapper = styled.div`
  color: rgb(16, 185, 129);
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  display: flex;
  align-items: center;

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

const BadgeText = styled.span`
  color: rgb(148, 163, 184);
  font-size: 0.75rem;
`;

const Nav = ({ view, setView }) => (
  <NavBar>
    <LogoContainer onClick={() => setView('home')}>
      <LogoIcon>
        <Scale className="text-white w-6 h-6" />
      </LogoIcon>
      <LogoText>
        SINMENTIRAS<span>.AR</span>
      </LogoText>
    </LogoContainer>
    <NavMenu>
      <NavButton $active={view === 'home'} onClick={() => setView('home')}>
        Auditoría
      </NavButton>
      <NavButton
        $active={view === 'roadmap'}
        onClick={() => setView('roadmap')}
      >
        Roadmap
      </NavButton>
      <NavButton
        $active={view === 'ranking'}
        onClick={() => setView('ranking')}
      >
        Ranking
      </NavButton>
      <InfoBadge>
        <IconWrapper>
          <Globe className="w-3 h-3" />
        </IconWrapper>
        <BadgeText>Fuentes 100% Públicas</BadgeText>
      </InfoBadge>
    </NavMenu>
  </NavBar>
);

export default Nav;
