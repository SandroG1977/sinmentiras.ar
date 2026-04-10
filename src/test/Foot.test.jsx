import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Foot from '../components/Foot';

describe('Foot', () => {
  it('renderiza textos institucionales del footer', () => {
    render(<Foot />);

    expect(
      screen.getByText(/información de dominio público - ley 27.275/i)
    ).toBeInTheDocument();
    expect(screen.getByText('IAAUTOMATIONS Systems')).toBeInTheDocument();
    expect(screen.getByText('Seguridad Zero Trust')).toBeInTheDocument();
  });
});
