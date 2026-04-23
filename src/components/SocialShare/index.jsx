import { useMemo, useState } from 'react';
import { Copy, Download, Share2 } from 'lucide-react';
import { FaTelegram, FaWhatsapp, FaXTwitter } from 'react-icons/fa6';
import { toPng } from 'html-to-image';
import styled from 'styled-components';

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const ControlBase = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.7rem 1rem;
  color: #fff;
  background: #1e293b;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 9999px;
  transition: all 0.2s ease;
  cursor: pointer;
  text-decoration: none;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  position: relative;

  &:hover {
    transform: translateY(-1px);
    border-color: rgba(255, 255, 255, 0.3);

    &::after {
      opacity: 1;
    }
  }

  &::after {
    content: attr(data-tooltip);
    position: absolute;
    bottom: calc(100% + 0.6rem);
    left: 50%;
    transform: translateX(-50%);
    background: rgba(15, 23, 42, 0.95);
    color: #fff;
    padding: 0.45rem 0.75rem;
    border-radius: 0.375rem;
    font-size: 0.7rem;
    font-weight: 600;
    white-space: nowrap;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.2s ease;
    border: 1px solid rgba(255, 255, 255, 0.15);
    z-index: 10;
  }
`;

const ActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.7rem 1rem;
  color: #fff;
  background: #1e293b;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 9999px;
  transition: all 0.2s ease;
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  position: relative;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    border-color: rgba(255, 255, 255, 0.3);

    &::after {
      opacity: 1;
    }
  }

  &:disabled {
    opacity: 0.75;
    cursor: not-allowed;
  }

  &::after {
    content: attr(data-tooltip);
    position: absolute;
    bottom: calc(100% + 0.6rem);
    left: 50%;
    transform: translateX(-50%);
    background: rgba(15, 23, 42, 0.95);
    color: #fff;
    padding: 0.45rem 0.75rem;
    border-radius: 0.375rem;
    font-size: 0.7rem;
    font-weight: 600;
    white-space: nowrap;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.2s ease;
    border: 1px solid rgba(255, 255, 255, 0.15);
    z-index: 10;
  }
`;

const WhatsappLink = styled(ControlBase)`
  background: rgba(22, 163, 74, 0.18);
  border-color: rgba(34, 197, 94, 0.35);
`;

const XLink = styled(ControlBase)`
  background: rgba(15, 23, 42, 0.9);
  border-color: rgba(148, 163, 184, 0.35);
`;

const TelegramLink = styled(ControlBase)`
  background: rgba(14, 165, 233, 0.18);
  border-color: rgba(56, 189, 248, 0.35);
`;

const DownloadButton = styled(ActionButton)`
  background: rgba(217, 119, 6, 0.18);
  border-color: rgba(245, 158, 11, 0.35);
`;

const Feedback = styled.p`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  margin: 0;
  color: #60a5fa;
  font-size: 0.75rem;
  font-weight: 700;
`;

const FeedbackDot = styled.span`
  width: 0.35rem;
  height: 0.35rem;
  border-radius: 9999px;
  background: currentColor;
`;

export default function SocialShare({ result, captureRef }) {
  const [feedback, setFeedback] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);

  const shareData = useMemo(() => {
    const verdict = String(result?.verdict ?? '').trim();
    const query = String(result?.query ?? '').trim();
    const summary = String(result?.summary_ia ?? '').trim();
    const url = window.location.href;
    const shareText = [
      query ? `Consulta: ${query}` : null,
      verdict ? `Veredicto: ${verdict}` : null,
      summary ? `Resumen: ${summary}` : null,
      `Fuente: ${url}`,
    ]
      .filter(Boolean)
      .join('\n\n');

    const shortText = [
      query ? `Consulta: ${query}` : null,
      verdict ? `Veredicto: ${verdict}` : null,
      url,
    ]
      .filter(Boolean)
      .join(' | ');

    return {
      url,
      shareText,
      shortText,
      title: 'Resultado - sinmentiras.ar',
    };
  }, [result]);

  if (!result) return null;

  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(shareData.shareText)}`;
  const xHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.shortText)}`;
  const telegramHref = `https://t.me/share/url?url=${encodeURIComponent(shareData.url)}&text=${encodeURIComponent(shareData.shareText)}`;

  const handleCopy = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareData.shareText);
      } else {
        const helper = document.createElement('textarea');
        helper.value = shareData.shareText;
        helper.setAttribute('readonly', 'true');
        helper.style.position = 'absolute';
        helper.style.left = '-9999px';
        document.body.appendChild(helper);
        helper.select();
        document.execCommand('copy');
        document.body.removeChild(helper);
      }
      setFeedback('Copiado para compartir');
    } catch (error) {
      console.error('No se pudo copiar el resultado:', error);
      setFeedback('No se pudo copiar');
    }
  };

  const handleDownload = async () => {
    if (!captureRef?.current) {
      setFeedback('No se pudo generar la placa');
      return;
    }

    setIsDownloading(true);

    try {
      const dataUrl = await toPng(captureRef.current, {
        cacheBust: true,
        backgroundColor: '#020617',
        pixelRatio: 2,
      });

      const link = document.createElement('a');
      link.download = `sinmentiras-veredicto-${result.id || 'resultado'}.png`;
      link.href = dataUrl;
      link.click();
      setFeedback('Placa descargada');
    } catch (error) {
      console.error('No se pudo descargar la placa:', error);
      setFeedback('No se pudo generar la placa');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleNativeShare = async () => {
    if (!navigator.share) return;

    try {
      await navigator.share({
        title: shareData.title,
        text: shareData.shareText,
        url: shareData.url,
      });
      setFeedback('Resultado compartido');
    } catch (error) {
      if (error?.name !== 'AbortError') {
        console.error('No se pudo abrir el menú de compartir:', error);
        setFeedback('No se pudo compartir');
      }
    }
  };

  return (
    <Actions aria-label="acciones de compartir">
      <XLink
        href={xHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Compartir en X"
        data-tooltip="X"
      >
        <FaXTwitter size={16} />
      </XLink>
      <WhatsappLink
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Compartir en WhatsApp"
        data-tooltip="WhatsApp"
      >
        <FaWhatsapp size={16} />
      </WhatsappLink>

      <TelegramLink
        href={telegramHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Compartir en Telegram"
        data-tooltip="Telegram"
      >
        <FaTelegram size={16} />
      </TelegramLink>

      <ActionButton
        type="button"
        onClick={handleCopy}
        aria-label="Copiar resultado"
        data-tooltip="Copiar"
      >
        <Copy size={16} />
      </ActionButton>
      <DownloadButton
        type="button"
        onClick={handleDownload}
        aria-label="Descargar placa para Instagram"
        disabled={isDownloading}
        data-tooltip="Descargar placa"
      >
        <Download size={16} />
        {isDownloading ? 'Generando...' : ''}
      </DownloadButton>

      {navigator.share ? (
        <ActionButton
          type="button"
          onClick={handleNativeShare}
          aria-label="Más opciones para compartir"
          data-tooltip="Más opciones"
        >
          <Share2 size={16} />
          Más
        </ActionButton>
      ) : null}

      {feedback ? (
        <Feedback>
          <FeedbackDot />
          {feedback}
        </Feedback>
      ) : null}
    </Actions>
  );
}
