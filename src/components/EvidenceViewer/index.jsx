import styled from 'styled-components';
import { ExternalLink, FileText } from 'lucide-react';

const EvidenceViewer = ({ result }) => {
    if (!result) return null;

    const [firstHighlight = '', secondHighlight = ''] = result.highlights ?? [];
    const sourceText = String(result.original_text ?? '');

    const [beforeFirst, afterFirstRaw] = firstHighlight
        ? sourceText.split(firstHighlight)
        : [sourceText, ''];
    const [betweenHighlights, afterSecond] = secondHighlight
        ? String(afterFirstRaw ?? '').split(secondHighlight)
        : [String(afterFirstRaw ?? ''), ''];

    return (
        <RightColumn>
            <SourceCard>
                <SourceHeader>
                    <SourceHeaderLeft>
                        <SourceFileIcon size={20} />
                        <SourceHeaderLabel>Documento Fuente</SourceHeaderLabel>
                    </SourceHeaderLeft>
                    <SourceLink href={result.source_url} target="_blank" rel="noopener noreferrer">
                        VER EN BORA.GOB.AR <ExternalLink size={12} />
                    </SourceLink>
                </SourceHeader>

                <DocumentBody>
                    <DocumentMeta>
                        <div>
                            <MetaLabel>Identificador Legislativo</MetaLabel>
                            <MetaValue>{result.source_law}</MetaValue>
                        </div>
                        <OriginalTag>ORIGINAL</OriginalTag>
                    </DocumentMeta>

                    <DocumentText>
                        [...] {beforeFirst}
                        {firstHighlight ? <PrimaryHighlight>{firstHighlight}</PrimaryHighlight> : null}
                        {betweenHighlights}
                        {secondHighlight ? <SecondaryHighlight>{secondHighlight}</SecondaryHighlight> : null}
                        {afterSecond} [...]
                    </DocumentText>

                    <Footer>
                        <FooterLine>FUENTE PUBLICA: LEY 27.275 DE ACCESO A LA INFORMACION</FooterLine>
                        <FooterLine>AUDITOR: IAAUTOMATIONS AI ENGINE</FooterLine>
                    </Footer>
                </DocumentBody>
            </SourceCard>
        </RightColumn>
    );
};

const BaseCard = styled.div`
	background: #0f172a;
	border: 1px solid rgba(255, 255, 255, 0.1);
	box-shadow: 0 24px 50px rgba(0, 0, 0, 0.4);
`;

const RightColumn = styled.div`
	width: 100%;

	@media (min-width: 1024px) {
		width: 480px;
	}
`;

const SourceCard = styled(BaseCard)`
	border-radius: 40px;
	overflow: hidden;
	position: sticky;
	top: 7rem;
`;

const SourceHeader = styled.div`
	background: rgba(30, 41, 59, 0.5);
	padding: 1.5rem;
	border-bottom: 1px solid rgba(255, 255, 255, 0.05);
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 0.5rem;
	backdrop-filter: blur(8px);
`;

const SourceHeaderLeft = styled.div`
	display: flex;
	align-items: center;
	gap: 0.75rem;
`;

const SourceFileIcon = styled(FileText)`
	color: #3b82f6;
`;

const SourceHeaderLabel = styled.span`
	font-size: 11px;
	font-weight: 900;
	color: #cbd5e1;
	text-transform: uppercase;
	letter-spacing: 0.1em;
	font-style: italic;
`;

const SourceLink = styled.a`
	color: #3b82f6;
	display: inline-flex;
	align-items: center;
	gap: 0.25rem;
	font-size: 10px;
	font-weight: 900;
	transition: color 0.2s ease;
	text-decoration: none;

	&:hover {
		color: #fff;
	}
`;

const DocumentBody = styled.div`
	padding: 2.5rem;
	font-family: ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif;
	color: #94a3b8;
	font-size: 1.125rem;
	line-height: 2;
	height: 650px;
	overflow-y: auto;
	background: rgba(15, 23, 42, 0.5);
`;

const DocumentMeta = styled.div`
	margin-bottom: 2.5rem;
	padding-bottom: 1rem;
	border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	gap: 0.5rem;
`;

const MetaLabel = styled.p`
	font-size: 10px;
	font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
	color: #3b82f6;
	font-weight: 900;
	text-transform: uppercase;
	letter-spacing: 0.1em;
	margin-bottom: 0.25rem;
`;

const MetaValue = styled.p`
	font-size: 0.75rem;
	color: #fff;
	font-weight: 700;
`;

const OriginalTag = styled.div`
	padding: 0.25rem 0.75rem;
	background: rgba(16, 185, 129, 0.1);
	color: #10b981;
	font-size: 10px;
	font-weight: 900;
	border-radius: 0.5rem;
	border: 1px solid rgba(16, 185, 129, 0.2);
	text-transform: uppercase;
	font-style: italic;
`;

const DocumentText = styled.p`
	position: relative;
`;

const HighlightBase = styled.span`
	color: #fff;
	font-weight: 700;
	padding: 0 0.25rem;
	border-radius: 0.375rem;
	text-decoration: underline;
	text-underline-offset: 4px;
	text-decoration-thickness: 2px;
`;

const PrimaryHighlight = styled(HighlightBase)`
	background: rgba(37, 99, 235, 0.3);
	text-decoration-color: #3b82f6;
`;

const SecondaryHighlight = styled(HighlightBase)`
	background: rgba(5, 150, 105, 0.3);
	text-decoration-color: #10b981;
`;

const Footer = styled.div`
	margin-top: 10rem;
	border-top: 1px solid rgba(255, 255, 255, 0.1);
	padding-top: 2.5rem;
	opacity: 0.2;
	text-align: center;
`;

const FooterLine = styled.p`
	font-size: 9px;
	font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
	text-transform: uppercase;
	letter-spacing: 0.3em;
`;

export default EvidenceViewer;
