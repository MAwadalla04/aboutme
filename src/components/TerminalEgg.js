import React, { useCallback, useEffect, useRef, useState } from 'react';

const RESUME_URL = `${process.env.PUBLIC_URL}/resume/Mohamed%27s%20Resume.pdf`;

const TerminalEgg = ({ knicksMode, onToggleKnicksMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState(['type help for commands']);
  const inputRef = useRef(null);
  const previousFocusRef = useRef(null);

  const closeTerminal = useCallback(() => {
    setIsOpen(false);
    window.requestAnimationFrame(() => previousFocusRef.current?.focus());
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const desktop = window.matchMedia('(min-width: 769px)').matches;
      if (event.code === 'Backquote' && desktop) {
        event.preventDefault();
        if (isOpen) {
          closeTerminal();
        } else {
          previousFocusRef.current = document.activeElement;
          setIsOpen(true);
        }
      } else if (event.key === 'Escape' && isOpen) {
        event.preventDefault();
        closeTerminal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeTerminal, isOpen]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const runCommand = (event) => {
    event.preventDefault();
    const nextCommand = command.trim().toLowerCase();
    setCommand('');

    if (!nextCommand) return;
    if (nextCommand === 'help') {
      setOutput((lines) => [...lines, '$ help', 'commands: knicks, resume, clear, exit']);
    } else if (nextCommand === 'knicks') {
      onToggleKnicksMode();
      setOutput((lines) => [...lines, '$ knicks', `knicks mode ${knicksMode ? 'off' : 'on'}`]);
    } else if (nextCommand === 'resume') {
      window.open(RESUME_URL, '_blank', 'noopener,noreferrer');
      setOutput((lines) => [...lines, '$ resume', 'opening resume...']);
    } else if (nextCommand === 'clear') {
      setOutput([]);
    } else if (nextCommand === 'exit') {
      closeTerminal();
    } else {
      setOutput((lines) => [...lines, `$ ${nextCommand}`, 'command not found']);
    }
  };

  if (!isOpen) return null;

  return (
    <aside className="terminal-egg" aria-label="Terminal easter egg panel">
      <div className="terminal-output" aria-live="polite">
        {output.map((line, index) => <div key={`${line}-${index}`}>{line}</div>)}
      </div>
      <form className="terminal-form" onSubmit={runCommand}>
        <span aria-hidden="true">$</span>
        <input
          ref={inputRef}
          value={command}
          onChange={(event) => setCommand(event.target.value)}
          aria-label="Terminal easter egg"
          autoComplete="off"
          spellCheck="false"
        />
      </form>
    </aside>
  );
};

export default TerminalEgg;
