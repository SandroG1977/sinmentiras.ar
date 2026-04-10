import styled from 'styled-components';
import { CheckCircle2, Globe, ShieldAlert, XCircle } from 'lucide-react';

const VeredictViewer = ({ result }) => {
    if (!result) return null;

    return (
        <Container>
            <VerdictCard>
                <VerdictHeader>
                    <VerdictTag>{result.verdict}</VerdictTag>
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
                            {news.sentiment === 'negative' ? <NegativeIcon /> : <NeutralIcon />}
                        </NewsRow>
                    ))}
                </NewsBlock>
            </VerdictCard>

            <IntegrityCard>
                <IntegrityIconWrap>
                    <ShieldAlert size={32} />
                </IntegrityIconWrap>
                <div>
                    <IntegrityTitle>Aviso de Integridad</IntegrityTitle>
                    <IntegrityText>
                        Este análisis se basa exclusivamente en documentos de dominio público. No se procesa
                        información privada ni confidencial. La IA actúa como un procesador de lenguaje sobre
                        fuentes oficiales inalterables.
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
`;

const VerdictHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 2.5rem;
	gap: 1rem;
`;

const VerdictTag = styled.span`
	padding: 0.5rem 1.25rem;
	background: rgba(245, 158, 11, 0.1);
	color: #f59e0b;
	font-size: 11px;
	font-weight: 900;
	border-radius: 9999px;
	border: 1px solid rgba(245, 158, 11, 0.2);
	text-transform: uppercase;
	letter-spacing: 0.2em;
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
`;

const SummaryBox = styled.div`
	background: rgba(255, 255, 255, 0.03);
	padding: 2rem;
	border-radius: 32px;
	border-left: 8px solid #2563eb;
	margin-bottom: 2.5rem;
`;

const SummaryText = styled.p`
	font-size: 1.25rem;
	color: #e2e8f0;
	font-weight: 500;
	line-height: 1.75;
	font-style: italic;
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
