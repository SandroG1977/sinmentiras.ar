import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import HomeView from '../components/HomeView';
import ResolutionViewer from '../components/ResolutionViewer';
import RankingView from '../components/RankingView';
import RoadmapView from '../components/RoadmapView';
import MOCK_RESOLUTION from '../datos/mocked_resolution';

const getStyledCss = () => {
  const styleTags = document.querySelectorAll(
    'style[data-styled], style[data-styled-version]'
  );

  return Array.from(styleTags)
    .map((tag) => tag.textContent || '')
    .join('\n');
};

describe('Responsive styles by screen format', () => {
  it('aplica reglas mobile en HomeView (max-width: 768px)', () => {
    render(<HomeView query="" handleSearch={() => {}} isLoading={false} />);

    const css = getStyledCss();

    expect(css).toMatch(/@media\s*\(max-width:\s*768px\)/);
    expect(css).toMatch(/font-size:\s*clamp\(2rem,\s*11vw,\s*2\.9rem\)/);
    expect(css).toMatch(/padding-right:\s*4\.25rem/);
    expect(css).toMatch(/transform:\s*translateY\(-50%\)/);
  });

  it('aplica reglas responsive en ResolutionViewer y EvidenceViewer', () => {
    render(<ResolutionViewer result={MOCK_RESOLUTION} />);

    const css = getStyledCss();

    expect(css).toMatch(/@media\s*\(max-width:\s*1023px\)/);
    expect(css).toMatch(/position:\s*static/);
    expect(css).toMatch(/height:\s*min\(65vh,\s*650px\)/);
    expect(css).toMatch(/max-height:\s*75vh/);
  });

  it('aplica reglas mobile en RankingView para evitar deformación horizontal', () => {
    render(<RankingView />);

    const css = getStyledCss();

    expect(css).toMatch(/overflow-x:\s*auto/);
    expect(css).toMatch(/min-width:\s*720px/);
    expect(css).toMatch(/font-size:\s*clamp\(1\.4rem,\s*8vw,\s*1\.9rem\)/);
  });

  it('aplica reglas mobile en RoadmapView y RoadmapPhaseCard', () => {
    render(<RoadmapView />);

    const css = getStyledCss();

    expect(css).toMatch(/@media\s*\(max-width:\s*768px\)/);
    expect(css).toMatch(/gap:\s*1rem/);
    expect(css).toMatch(/padding:\s*1\.25rem/);
    expect(css).toMatch(/flex-direction:\s*column/);
  });
});
