import styled from 'styled-components';
import { Globe } from 'lucide-react';

const Footer = styled.footer`
  margin-top: 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 2.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding: 5rem 3rem;
  color: rgb(71, 85, 105);
  font-size: 10px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.4em;

  @media (min-width: 768px) {
    flex-direction: row;
  }

  @media (max-width: 767px) {
    margin-top: 4rem;
    gap: 1rem;
    padding: 2rem 1rem;
    font-size: 0.56rem;
    letter-spacing: 0.12em;
  }
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: rgb(148, 163, 184);
`;

const Right = styled.div`
  display: flex;
  gap: 4rem;

  @media (max-width: 767px) {
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.9rem;
  }
`;

const FooterText = styled.span`
  cursor: pointer;
  text-transform: uppercase;
  transition: color 0.3s ease;

  &:hover {
    color: white;
  }
`;

const BrandText = styled(FooterText)`
  font-style: italic;
`;

const GlobeIcon = styled(Globe)`
  width: 1rem;
  height: 1rem;
  color: rgb(16, 185, 129);
`;

const Foot = () => {
  return (
    <Footer>
      <Left>
        <GlobeIcon />
        <span>Información de Dominio Público - Ley 27.275</span>
      </Left>

      <Right>
        <BrandText>IAAUTOMATIONS Systems</BrandText>
        <FooterText>Seguridad Zero Trust</FooterText>
      </Right>
    </Footer>
  );
};

export default Foot;
