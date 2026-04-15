import styled from 'styled-components';
import {
  Search,
  Globe,
  Fingerprint,
  ShieldAlert,
  CheckCircle2,
} from 'lucide-react';
import { keyframes } from 'styled-components';
import { useEffect, useState } from 'react';

const Container = styled.div`
  max-width: 80rem;
  margin: 6rem auto;
  padding: 0 1.5rem;
  text-align: center;

  @media (max-width: 768px) {
    margin: 2.75rem auto;
    padding: 0 1rem;
  }
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 1rem;
  border-radius: 9999px;
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.2);
  color: rgb(96, 165, 250);
  font-size: 0.625rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 3.75rem;
  font-weight: 900;
  color: white;
  margin-bottom: 2rem;
  letter-spacing: -0.025em;
  line-height: 0.95;

  br {
    display: block;
  }

  @media (max-width: 768px) {
    font-size: clamp(2rem, 11vw, 2.9rem);
    margin-bottom: 1.25rem;
    line-height: 1.05;
  }
`;

const Highlight = styled.span`
  background: linear-gradient(to right, rgb(59, 130, 246), rgb(16, 185, 129));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled.p`
  color: rgb(148, 163, 184);
  font-size: 1.25rem;
  margin-bottom: 3rem;
  max-width: 42rem;
  margin-left: auto;
  margin-right: auto;
  font-weight: 500;
  line-height: 1.625;

  span {
    color: white;
    font-weight: 700;
    text-decoration: underline;
    text-decoration-color: rgb(59, 130, 246);
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 2rem;
  }
`;

const FormGroup = styled.form`
  position: relative;
  max-width: 48rem;
  margin: 0 auto;
  margin-bottom: 7rem;

  @media (max-width: 768px) {
    margin-bottom: 3rem;
  }
`;

const FormGlow = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(37, 99, 235, 0.2);
  filter: blur(48px);
  opacity: 0;
  transition: opacity 0.3s ease;

  ${FormGroup}:hover & {
    opacity: 1;
  }
`;

const SearchInput = styled.input`
  position: relative;
  width: 100%;
  background: rgb(15, 23, 42);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1.5rem;
  padding: 1.75rem 2rem;
  padding-right: 6rem;
  color: white;
  font-size: 1.125rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  transition: all 0.3s ease;

  &::placeholder {
    color: rgb(71, 85, 105);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgb(59, 130, 246);
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 1rem 1rem;
    padding-right: 4.25rem;
    border-radius: 1rem;
  }
`;

const SearchButton = styled.button`
  position: absolute;
  right: 0.6rem;
  top: 50%;
  transform: translateY(-50%);
  background: rgb(37, 99, 235);
  border: none;
  color: white;
  padding: 1rem;
  border-radius: 0.625rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.3);

  &:hover {
    background: rgb(29, 78, 216);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }

  @media (max-width: 768px) {
    padding: 0.8rem;
    border-radius: 0.8rem;

    svg {
      width: 1.2rem;
      height: 1.2rem;
    }
  }
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 9999px;
  border: 2px solid rgba(255, 255, 255, 0.35);
  border-top-color: white;
  animation: ${spin} 0.9s linear infinite;
`;

const ErrorMessage = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin: -4rem auto 3rem;
  padding: 0.75rem 1.25rem;
  border-radius: 0.75rem;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: rgb(252, 165, 165);
  font-size: 0.875rem;
  max-width: 48rem;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  text-align: left;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 767px) {
    gap: 1rem;
  }
`;

const FeatureCard = styled.div`
  padding: 2rem;
  border-radius: 2rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(59, 130, 246, 0.4);
    background: rgba(59, 130, 246, 0.05);
  }

  h3 {
    color: white;
    font-weight: 900;
    margin-bottom: 0.75rem;
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  p {
    color: rgb(100, 116, 139);
    font-size: 0.875rem;
    line-height: 1.625;
    font-weight: 500;
  }

  svg {
    color: rgb(59, 130, 246);
    margin-bottom: 1.5rem;
    width: 2.5rem;
    height: 2.5rem;
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    padding: 1.25rem;
    border-radius: 1.25rem;
  }
`;

const FEATURES = [
  {
    icon: Globe,
    title: 'Origen Público',
    desc: 'Toda la información proviene de fuentes gubernamentales de libre acceso según Ley 27.275.',
  },
  {
    icon: Fingerprint,
    title: 'Firma Digital',
    desc: 'Cada resolución está anclada a un Hash SHA-256 del documento original en el BORA.',
  },
  {
    icon: ShieldAlert,
    title: 'Auditable',
    desc: 'Cualquier ciudadano puede verificar el contraste técnico mediante el link a la fuente oficial.',
  },
];

const HomeView = ({ query, handleSearch, isLoading, error }) => {
  const [draftQuery, setDraftQuery] = useState(query);

  useEffect(() => {
    setDraftQuery(query);
  }, [query]);

  const onSubmit = (e) => {
    e.preventDefault();
    handleSearch(draftQuery);
  };

  return (
    <Container>
      <Badge>
        <CheckCircle2 size={14} />
        Auditoría de Datos de Dominio Público
      </Badge>

      <Title>
        MATEMÁTICA CONTRA <br />
        <Highlight>EL RELATO POLÍTICO.</Highlight>
      </Title>

      <Subtitle>
        Contrastá cualquier declaración con la base de datos oficial del{' '}
        <span>Boletín Oficial</span> y el <span>Congreso</span>.
      </Subtitle>

      <FormGroup onSubmit={onSubmit}>
        <FormGlow />
        <SearchInput
          type="text"
          value={draftQuery}
          onChange={(e) => setDraftQuery(e.target.value)}
          placeholder="Ej: ¿Qué dice el DNU sobre las cuotas en indemnizaciones?"
        />
        <SearchButton type="submit" disabled={isLoading}>
          {isLoading ? <Spinner /> : <Search />}
        </SearchButton>
      </FormGroup>

      {error && (
        <ErrorMessage>
          <ShieldAlert size={16} />
          {error}
        </ErrorMessage>
      )}

      <FeaturesGrid>
        {FEATURES.map((feature, i) => {
          const Icon = feature.icon;
          return (
            <FeatureCard key={i}>
              <Icon size={40} />
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </FeatureCard>
          );
        })}
      </FeaturesGrid>
    </Container>
  );
};

export default HomeView;
