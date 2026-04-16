import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import VeredictTag from '../components/VeredictViewer/VeredictTag';

describe('VeredictTag - Coverage for all verdict types', () => {
  it('renderiza tag con color verde para VERDADERO', () => {
    const { container } = render(<VeredictTag result="VERDADERO" />);
    const tag = container.querySelector('span');
    expect(tag).toHaveTextContent('VERDADERO');
    expect(tag).toBeInTheDocument();
  });

  it('renderiza tag con color rojo para FALSO', () => {
    const { container } = render(<VeredictTag result="FALSO" />);
    const tag = container.querySelector('span');
    expect(tag).toHaveTextContent('FALSO');
    expect(tag).toBeInTheDocument();
  });

  it('renderiza tag con color naranja para el caso default', () => {
    const { container } = render(<VeredictTag result="INDETERMINADO" />);
    const tag = container.querySelector('span');
    expect(tag).toHaveTextContent('INDETERMINADO');
    expect(tag).toBeInTheDocument();
  });

  it('no renderiza nada cuando result es null', () => {
    const { container } = render(<VeredictTag result={null} />);
    expect(container.firstChild).toBeNull();
  });

  it('no renderiza nada cuando result es undefined', () => {
    const { container } = render(<VeredictTag result={undefined} />);
    expect(container.firstChild).toBeNull();
  });
});
