import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import VisualIndex from './VisualIndex';
import FeaturedProject from './FeaturedProject';
import RickrollDialog from './RickrollDialog';
import Header from './Header';
import { FEATURED_PROJECT } from '../data/projects';

describe('portfolio featured work and surprise player', () => {
  let container;
  let root;

  beforeEach(() => {
    global.IS_REACT_ACT_ENVIRONMENT = true;
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
    HTMLDialogElement.prototype.showModal = function showModal() { this.open = true; };
    HTMLDialogElement.prototype.close = function close() { this.open = false; };
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
    document.body.style.overflow = '';
    global.IS_REACT_ACT_ENVIRONMENT = false;
  });

  it('features KnicksIQ first and expands it by default, with the live screenshot and link', () => {
    const onOpen = jest.fn();
    act(() => root.render(<VisualIndex onOpen={onOpen} />));
    const first = container.querySelector('.pg-index-item');
    const trigger = first.querySelector('button');
    expect(trigger.textContent).toContain('01KnicksIQ');
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    expect(first.querySelector('.pg-index-panel').hidden).toBe(false);
    expect(first.querySelector('img').getAttribute('src')).toBe(FEATURED_PROJECT.image);
    expect(first.querySelector('a').href).toBe('https://www.knicksiq.win/');
    act(() => first.querySelector('.projects-index-case-study').click());
    expect(onOpen).toHaveBeenCalledWith(FEATURED_PROJECT);
    act(() => trigger.click());
    expect(first.querySelector('.pg-index-panel').hidden).toBe(true);
  });

  it('shares the same real project data on the homepage', () => {
    act(() => root.render(<FeaturedProject />));
    expect(container.querySelector('h2').textContent).toBe(FEATURED_PROJECT.title);
    expect(container.querySelector('img').getAttribute('alt')).toBe(FEATURED_PROJECT.imageAlt);
    expect(container.querySelector('a[href="/projects"]')).not.toBeNull();
  });

  it('opens the official Rickroll in a new tab without mounting the deferred player', () => {
    act(() => root.render(<Header knicksMode={false} />));
    const link = container.querySelector('.surprise-nav-btn');
    expect(link.tagName).toBe('A');
    expect(link.href).toBe('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
    expect(link.target).toBe('_blank');
    expect(link.rel).toBe('noopener noreferrer');
    expect(link.getAttribute('aria-label')).toContain('new tab');
    expect(document.querySelector('.rickroll-dialog')).toBeNull();
  });

  it('keeps the deferred dialog implementation covered for future playback work', () => {
    const trigger = document.createElement('button');
    document.body.appendChild(trigger);
    trigger.focus();
    document.body.style.overflow = 'auto';
    const onClose = jest.fn();
    act(() => root.render(<RickrollDialog onClose={onClose} />));
    const dialog = document.querySelector('.rickroll-dialog');
    const source = new URL(dialog.querySelector('iframe').src);
    expect(source.pathname).toBe('/embed/dQw4w9WgXcQ');
    expect(source.searchParams.get('si')).toBe('3lWz-tXwk-1xnebm');
    expect(source.pathname.split('/').pop()).toHaveLength(11);
    expect(dialog.open).toBe(true);
    expect(document.body.style.overflow).toBe('hidden');
    act(() => dialog.querySelector('button').click());
    expect(onClose).toHaveBeenCalledTimes(1);
    act(() => root.render(null));
    expect(document.querySelector('.rickroll-player')).toBeNull();
    expect(document.body.style.overflow).toBe('auto');
    expect(document.activeElement).toBe(trigger);
    trigger.remove();
  });
});
