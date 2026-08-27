import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import Hero from './Hero';

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

  it('mounts the complete graph on every full page load', () => {
    window.localStorage.setItem('mohamed-awadalla-intro-seen', 'true');

    act(() => {
      root = createRoot(container);
      root.render(<Hero />);
    });

    expect(container.querySelector('.intro-overlay')).not.toBeNull();
    expect(container.querySelectorAll('.intro-autograd-graph .ag-edge')).toHaveLength(9);
    expect(container.querySelectorAll('.intro-autograd-graph .ag-node')).toHaveLength(10);
  });
});
