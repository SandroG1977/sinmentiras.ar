const MOCK_RESOLUTION = {
    id: "AUD-2024-882",
    query: "¿El nuevo decreto permite que las empresas paguen indemnizaciones en cuotas?",
    verdict: "INCONSISTENCIA TÉCNICA",
    summary_ia: "El decreto 70/2023 no establece el pago en cuotas por defecto, pero habilita que mediante convenio colectivo se cree un 'Fondo de Cese' que podría modificar la modalidad del pago indemnizatorio. La afirmación de que 'ya se puede pagar en cuotas' es prematura y técnicamente incompleta.",
    hash: "sha256:f4e8d221c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855e3b0",
    source_law: "Ley 25.877 - Art. 24 (Modificado por Proyecto Bases)",
    source_url: "https://www.boletinoficial.gob.ar/detalleAviso/primera/299000/20231221",
    original_text: "Las partes podrán sustituir el presente régimen de indemnizaciones por un sistema de fondo de cese laboral cuyo costo estará siempre a cargo del empleador, con un aporte mensual que no podrá ser superior al OCHO POR CIENTO (8%) de la remuneración computable...",
    highlights: [
    "sustituir el presente régimen de indemnizaciones",
    "sistema de fondo de cese laboral"
    ],
    news_context: [
    { source: "C5N", title: "Confirmado: Se terminan las indemnizaciones de un solo pago", sentiment: "negative" },
        { source: "Infobae", title: "Cómo funciona el nuevo fondo de cese laboral", sentiment: "neutral" }
    ]
};

export default MOCK_RESOLUTION; 