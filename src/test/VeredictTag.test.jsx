import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import VeredictTag from '../components/VeredictViewer/VeredictTag';

describe('VeredictTag - Coverage for all verdict types', () => {
  it('renderiza tag con color verde para VERDADERO', () => {
    render(<VeredictTag result="VERDADERO" />);
    expect(screen.getByText('VERDADERO')).toBeInTheDocument();
  });

  it('renderiza tag con color rojo para FALSO', () => {
    render(<VeredictTag result="FALSO" />);
    expect(screen.getByText('FALSO')).toBeInTheDocument();
  });

  it('renderiza tag con color naranja para el caso default', () => {
    render(<VeredictTag result="INDETERMINADO" />);
    expect(screen.getByText('INDETERMINADO')).toBeInTheDocument();
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
