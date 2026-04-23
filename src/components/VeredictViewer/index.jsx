import { useRef } from 'react';
import styled from 'styled-components';
import VeredictTag from './VeredictTag';
import { CheckCircle2, Globe, Scale, ShieldAlert, XCircle } from 'lucide-react';
import SocialShare from '../SocialShare';

const VeredictViewer = ({ result }) => {
  const exportCardRef = useRef(null);

  if (!result) return null;

  return (
    <Container>
      <HiddenExportSurface aria-hidden="true">
        <ExportCanvas ref={exportCardRef}>
          <ExportLogoContainer>
            <ExportLogoIcon>
              <Scale size={38} />
            </ExportLogoIcon>
            <ExportLogoText>
              SINMENTIRAS<ExportLogoDot>.AR</ExportLogoDot>
            </ExportLogoText>
          </ExportLogoContainer>
          <ExportTitle>Resultado de Verificacion</ExportTitle>

          <ExportSection>
            <ExportLabel>Consulta</ExportLabel>
            <ExportValue>{result.query}</ExportValue>
          </ExportSection>

          <ExportSection>
            <ExportLabel>Veredicto</ExportLabel>
            <ExportVerdict>{result.verdict}</ExportVerdict>
          </ExportSection>

          <ExportSection>
            <ExportLabel>Resumen</ExportLabel>
            <ExportValue>{result.summary_ia}</ExportValue>
          </ExportSection>

          <ExportSource>Fuente: {window.location.href}</ExportSource>
        </ExportCanvas>
      </HiddenExportSurface>

      <VerdictCard>
        <ShareableContent data-testid="shareable-verdict-card">
          <VerdictHeader>
            <VeredictTag result={result.verdict} />
            <DataOrigin>
              <Globe size={14} />
              <DataOriginText>DATA ORIGIN: BORA.GOB.AR</DataOriginText>
            </DataOrigin>
          </VerdictHeader>

          <QueryTitle>{result.query}</QueryTitle>

          <SummaryBox>
            <SummaryText>"{result.summary_ia}"</SummaryText>
          </SummaryBox>

          <NewsBlock>
            <NewsTitle>Contraste de Medios Auditados</NewsTitle>
            {(result.news_context ?? []).map((news, i) => (
              <NewsRow key={i}>
                <div>
                  <NewsSource>{news.source}</NewsSource>
                  <NewsHeadline>{news.title}</NewsHeadline>
                </div>
                {news.sentiment === 'negative' ? (
                  <NegativeIcon />
                ) : (
                  <NeutralIcon />
                )}
              </NewsRow>
            ))}
          </NewsBlock>
        </ShareableContent>

        <ShareRow>
          <SocialShare result={result} captureRef={exportCardRef} />
        </ShareRow>
      </VerdictCard>

      <IntegrityCard>
        <IntegrityIconWrap>
          <ShieldAlert size={32} />
        </IntegrityIconWrap>
        <div>
          <IntegrityTitle>Aviso de Integridad</IntegrityTitle>
          <IntegrityText>
            Este análisis se basa exclusivamente en documentos de dominio
            público. No se procesa información privada ni confidencial. La IA
            actúa como un procesador de lenguaje sobre fuentes oficiales
            inalterables.
          </IntegrityText>
        </div>
      </IntegrityCard>
    </Container>
  );
};

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const BaseCard = styled.div`
  background: #0f172a;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 24px 50px rgba(0, 0, 0, 0.4);
`;

const VerdictCard = styled(BaseCard)`
  border-radius: 40px;
  padding: 3rem;

  @media (max-width: 768px) {
    border-radius: 1.25rem;
    padding: 1.25rem;
  }
`;

const ShareableContent = styled.div``;

const HiddenExportSurface = styled.div`
  position: fixed;
  top: 0;
  left: -99999px;
  opacity: 0;
  pointer-events: none;
`;

const ExportCanvas = styled.div`
  width: 1600px;
  min-height: 900px;
  background: radial-gradient(
    circle at 20% 20%,
    #1e3a8a 0%,
    #0f172a 45%,
    #020617 100%
  );
  color: #e2e8f0;
  padding: 72px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  border-radius: 28px;
  border: 1px solid rgba(148, 163, 184, 0.25);
`;

const ExportLogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.9rem;
`;

const ExportLogoIcon = styled.div`
  background: rgb(37, 99, 235);
  color: #fff;
  padding: 0.7rem;
  border-radius: 0.75rem;
  box-shadow: 0 12px 30px rgba(37, 99, 235, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ExportLogoText = styled.p`
  margin: 0;
  font-size: 2.35rem;
  font-weight: 900;
  letter-spacing: -0.025em;
  color: #fff;
  text-transform: uppercase;
  font-style: italic;
`;

const ExportLogoDot = styled.span`
  color: rgb(59, 130, 246);
`;

const ExportTitle = styled.h3`
  margin: 0;
  color: #fff;
  font-size: 3rem;
  line-height: 1.1;
  letter-spacing: -0.03em;
`;

const ExportSection = styled.section`
  background: rgba(15, 23, 42, 0.55);
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 20px;
  padding: 1.5rem 1.75rem;
`;

const ExportLabel = styled.p`
  margin: 0 0 0.6rem;
  color: #93c5fd;
  font-size: 0.9rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const ExportValue = styled.p`
  margin: 0;
  color: #f8fafc;
  font-size: 1.9rem;
  font-weight: 600;
  line-height: 1.35;
`;

const ExportVerdict = styled.p`
  margin: 0;
  color: #f59e0b;
  font-size: 2.2rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

const ExportSource = styled.p`
  margin: auto 0 0;
  color: #94a3b8;
  font-size: 1rem;
  font-weight: 600;
`;

const VerdictHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 1.25rem;
  }
`;

const DataOrigin = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #475569;
`;

const DataOriginText = styled.span`
  font-size: 10px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  letter-spacing: -0.03em;
`;

const QueryTitle = styled.h2`
  font-size: 2.25rem;
  font-weight: 900;
  color: #fff;
  margin-bottom: 2rem;
  letter-spacing: -0.03em;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: clamp(1.4rem, 8vw, 1.9rem);
    margin-bottom: 1rem;
  }
`;

const SummaryBox = styled.div`
  background: rgba(255, 255, 255, 0.03);
  padding: 2rem;
  border-radius: 32px;
  border-left: 8px solid #2563eb;
  margin-bottom: 2.5rem;

  @media (max-width: 768px) {
    padding: 1rem;
    border-radius: 1rem;
    border-left-width: 4px;
    margin-bottom: 1.25rem;
  }
`;

const SummaryText = styled.p`
  font-size: 1.25rem;
  color: #e2e8f0;
  font-weight: 500;
  line-height: 1.75;
  font-style: italic;

  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.6;
  }
`;

const ShareRow = styled.div`
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

const NewsBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const NewsTitle = styled.h4`
  font-size: 10px;
  font-weight: 900;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  margin-bottom: 0.5rem;
`;

const NewsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.05);

  @media (max-width: 768px) {
    padding: 1rem;
    align-items: flex-start;
  }
`;

const NewsSource = styled.p`
  font-size: 10px;
  color: #3b82f6;
  font-weight: 900;
  text-transform: uppercase;
  margin-bottom: 0.25rem;
  letter-spacing: 0.1em;
`;

const NewsHeadline = styled.p`
  color: #fff;
  font-weight: 700;
`;

const NegativeIcon = styled(XCircle)`
  width: 24px;
  height: 24px;
  color: #ef4444;
  opacity: 0.7;
  flex-shrink: 0;
`;

const NeutralIcon = styled(CheckCircle2)`
  width: 24px;
  height: 24px;
  color: #475569;
  opacity: 0.5;
  flex-shrink: 0;
`;

const IntegrityCard = styled(BaseCard)`
  border-radius: 32px;
  padding: 2rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 768px) {
    border-radius: 1rem;
    padding: 1rem;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const IntegrityIconWrap = styled.div`
  padding: 1rem;
  background: #1e293b;
  border-radius: 1rem;
  color: #f59e0b;
`;

const IntegrityTitle = styled.h4`
  color: #fff;
  font-weight: 700;
  margin-bottom: 0.25rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-size: 0.875rem;
`;

const IntegrityText = styled.p`
  color: #64748b;
  font-size: 0.75rem;
  line-height: 1.5;
`;

export default VeredictViewer;
