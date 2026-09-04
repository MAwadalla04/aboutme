import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import Hero, { EDGES, INTRO_STORAGE_KEY, INTRO_TIMELINE, beamTimeline } from './Hero';

jest.mock('framer-motion', () => {
  const ReactModule = require('react');

  const motionComponent = (tagName) => ReactModule.forwardRef(({
    animate,
    children,
    initial,
    onAnimationComplete,
    transition,
    ...props
  }, ref) => ReactModule.createElement(tagName, { ...props, ref }, children));

  return {
    motion: {
      path: motionComponent('path'),
      p: motionComponent('p'),
      span: motionComponent('span'),
    },
  };
});

describe('Hero intro', () => {
  let container;
  let root;

  beforeEach(() => {
    global.IS_REACT_ACT_ENVIRONMENT = true;
    jest.useFakeTimers();
    window.localStorage.clear();
    window.sessionStorage.clear();
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      addListener: jest.fn(),
      removeListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    act(() => root?.unmount());
    container.remove();
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    global.IS_REACT_ACT_ENVIRONMENT = false;
  });

  it('mounts the complete graph and marks the tab session when playback starts', () => {
    window.localStorage.setItem('mohamed-awadalla-intro-seen', 'true');

    act(() => {
      root = createRoot(container);
      root.render(<Hero />);
    });

    expect(window.sessionStorage.getItem(INTRO_STORAGE_KEY)).toBe('true');
    expect(container.querySelector('.intro-overlay')).not.toBeNull();
    expect(container.querySelectorAll('.intro-autograd-graph .ag-edge')).toHaveLength(9);
    expect(container.querySelectorAll('.intro-autograd-graph .ag-node')).toHaveLength(10);
  });

  const mount = (strict = false) => act(() => {
    root = createRoot(container);
    root.render(strict ? <React.StrictMode><Hero /></React.StrictMode> : <Hero />);
  });

  it('changes the caption at 2.9 seconds and completes at 7.6 seconds in StrictMode', () => {
    mount(true);
    act(() => jest.advanceTimersByTime(2899));
    expect(container.querySelector('.intro-graph-caption').textContent).toContain('forward');
    act(() => jest.advanceTimersByTime(1));
    expect(container.querySelector('.intro-graph-caption').textContent).toContain('backprop');
    act(() => jest.advanceTimersByTime(2300));
    expect(container.querySelector('.intro-phase-greeting')).not.toBeNull();
    act(() => jest.advanceTimersByTime(600));
    expect(container.querySelector('.intro-phase-landing')).not.toBeNull();
    act(() => jest.advanceTimersByTime(1799));
    expect(container.querySelector('.intro-overlay')).not.toBeNull();
    act(() => jest.advanceTimersByTime(1));
    expect(container.querySelector('.intro-overlay')).toBeNull();
    expect(container.querySelector('.hero-first-name-pending')).toBeNull();
  });

  it('bypasses subsequent About mounts, even after leaving mid-intro', () => {
    mount();
    act(() => root.unmount());
    mount();
    expect(container.querySelector('.intro-overlay')).toBeNull();
    expect(jest.getTimerCount()).toBe(0);
  });

  it('bypasses all intro work for reduced motion', () => {
    window.matchMedia.mockReturnValue({ matches: true });
    mount();
    expect(container.querySelector('.intro-overlay')).toBeNull();
    expect(jest.getTimerCount()).toBe(0);
  });

  it('completes when storage reads and writes are blocked', () => {
    const read = jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw Error('blocked'); });
    const write = jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw Error('blocked'); });
    try {
      mount();
      expect(container.querySelector('.intro-overlay')).not.toBeNull();
      act(() => jest.advanceTimersByTime(INTRO_TIMELINE.done));
      expect(container.querySelector('.intro-overlay')).toBeNull();
    } finally {
      read.mockRestore();
      write.mockRestore();
    }
  });

  it('clears scheduled phases on unmount', () => {
    mount();
    act(() => root.unmount());
    root = null;
    expect(jest.getTimerCount()).toBe(0);
  });

});


describe('graph dependency timeline', () => {
  it.each([true, false])('runs independent edges together and waits for every incoming edge (forward=%s)', (forward) => {
    const stages = [0, 1, 2, 3].map(stage => EDGES.filter(edge => edge.stage === stage));
    if (!forward) stages.reverse();
    let end = forward ? 600 : 2900;
    stages.forEach(edges => {
      edges.forEach(edge => {
        const beam = beamTimeline(edge, forward);
        expect(beam.start).toBe(end);
        expect(beam.duration).toBe(525);
      });
      end += 525;
    });
    expect(end).toBe(forward ? 2700 : 5000);
  });

  it('uses actual unequal edge lengths and reverses the exact traversal', () => {
    expect(new Set(EDGES.map(edge => edge.length)).size).toBeGreaterThan(2);
    EDGES.forEach(edge => {
      const forward = beamTimeline(edge, true);
      const backward = beamTimeline(edge, false);
      expect(forward.from).toBe(50);
      expect(forward.to).toBe(-edge.length);
      expect(backward.from).toBe(forward.to);
      expect(backward.to).toBe(forward.from);
      expect(forward.dash).toBe(`50 ${edge.length + 50}`);
    });
  });
});
