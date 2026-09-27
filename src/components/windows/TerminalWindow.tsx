import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { skills } from '../../data/skills';

const COMMANDS: Record<string, () => string> = {
  help: () => `\x1b[cyan]Available commands:\x1b[reset]
  \x1b[green]skills\x1b[reset]      — list all tech skills
  \x1b[green]neofetch\x1b[reset]    — system info
  \x1b[green]whoami\x1b[reset]      — about me
  \x1b[green]clear\x1b[reset]       — clear terminal`,

  neofetch: () =>
    `\x1b[blue]  ██████████████\x1b[reset]  \x1b[bold]arsal\x1b[reset]@\x1b[blue]portfolio\x1b[reset]
\x1b[blue]  ██████████████\x1b[reset]  ──────────────────────────
\x1b[blue]  ██████████████\x1b[reset]  \x1b[dim]OS:\x1b[reset]       macOS Sonoma (Portfolio Edition)
\x1b[blue]  ██████████████\x1b[reset]  \x1b[dim]Role:\x1b[reset]     Full Stack & Mobile Developer
                  \x1b[dim]Age:\x1b[reset]      18 years
\x1b[red]  ██\x1b[reset]  \x1b[yellow]██\x1b[reset]  \x1b[green]██\x1b[reset]  \x1b[blue]██\x1b[reset]  \x1b[dim]Location:\x1b[reset] Bandung, Jawa Barat
\x1b[red]  ██\x1b[reset]  \x1b[yellow]██\x1b[reset]  \x1b[green]██\x1b[reset]  \x1b[blue]██\x1b[reset]  \x1b[dim]Shell:\x1b[reset]    zsh + oh-my-zsh
                  \x1b[dim]Langs:\x1b[reset]    TypeScript, Go, Dart, Python, PHP
                  \x1b[dim]Tools:\x1b[reset]    Vite, Docker, RabbitMQ, Git
                  \x1b[dim]GitHub:\x1b[reset]   \x1b[purple]kanaee-cloud\x1b[reset]`,

  skills: () =>
    skills.map((s, i) => {
      const colors = ['\x1b[blue]', '\x1b[purple]', '\x1b[green]', '\x1b[yellow]', '\x1b[cyan]'];
      const c = colors[i % colors.length];
      return `  ${c}▸\x1b[reset] ${s.name.padEnd(14)} \x1b[dim]${s.url}\x1b[reset]`;
    }).join('\n'),

  whoami: () =>
    `\x1b[bold]\x1b[blue]M. Arsal Nawfal Ali\x1b[reset]
\x1b[purple]Full Stack & Mobile Developer\x1b[reset]
\x1b[dim]──────────────────────────────────\x1b[reset]
\x1b[dim]School:\x1b[reset]  SMKN 4 Bandung
\x1b[dim]Bootcamp:\x1b[reset] DBS Foundation Coding Camp
\x1b[dim]Work:\x1b[reset]    Assistant Researcher @ ITB Center for Defense & Security
         Mobile Flutter Developer @ PT. Langgeng Sejahtera Kreasi`,

  clear: () => '__CLEAR__',
};

type LineType = 'input' | 'output' | 'error' | 'system';

interface Line {
  type: LineType;
  text: string;
}

const INITIAL_OUTPUT: Line[] = [
  { type: 'system', text: '┌─────────────────────────────────────────┐' },
  { type: 'system', text: '│  Arsal Portfolio Terminal  v2.0.0        │' },
  { type: 'system', text: '│  Type \x1b[green]help\x1b[reset] for available commands       │' },
  { type: 'system', text: '└─────────────────────────────────────────┘' },
  { type: 'output', text: '' },
];

// Parse pseudo-ANSI for colored segments
function parseAnsi(text: string): { text: string; className: string }[] {
  const colorMap: Record<string, string> = {
    '\x1b[blue]':   'text-[#64ABFF]',
    '\x1b[green]':  'text-[#30D158]',
    '\x1b[yellow]': 'text-[#FFD60A]',
    '\x1b[red]':    'text-[#FF453A]',
    '\x1b[purple]': 'text-[#BF5AF2]',
    '\x1b[cyan]':   'text-[#64D2FF]',
    '\x1b[dim]':    'text-white/35',
    '\x1b[bold]':   'font-bold text-white',
    '\x1b[reset]':  'text-white/65',
  };

  const parts: { text: string; className: string }[] = [];
  let remaining = text;
  let currentClass = 'text-white/65';

  const escapes = Object.keys(colorMap);
  while (remaining.length > 0) {
    let found = false;
    for (const esc of escapes) {
      if (remaining.startsWith(esc)) {
        currentClass = colorMap[esc];
        remaining = remaining.slice(esc.length);
        found = true;
        break;
      }
    }
    if (!found) {
      parts.push({ text: remaining[0], className: currentClass });
      remaining = remaining.slice(1);
    }
  }

  // Merge adjacent same-class
  const merged: { text: string; className: string }[] = [];
  for (const p of parts) {
    if (merged.length > 0 && merged[merged.length - 1].className === p.className) {
      merged[merged.length - 1].text += p.text;
    } else {
      merged.push({ ...p });
    }
  }
  return merged;
}

const TerminalLine = ({ line }: { line: Line }) => {
  if (line.type === 'input') {
    return (
      <div className="flex items-center gap-1 font-mono">
        <span className="text-[#30D158] font-semibold">arsal</span>
        <span className="text-white/30">@</span>
        <span className="text-[#64ABFF] font-semibold">portfolio</span>
        <span className="text-white/30 mx-1">~</span>
        <span className="text-[#FF9F0A]">$</span>
        <span className="text-white ml-1">{line.text}</span>
      </div>
    );
  }
  if (line.type === 'error') {
    return (
      <div className="flex items-center gap-2 font-mono">
        <span className="text-[#FF453A]">✗</span>
        <span className="text-[#FF453A]">zsh: command not found: </span>
        <span className="text-white/70">{line.text.replace('command not found: ', '')}</span>
      </div>
    );
  }
  if (line.type === 'system') {
    const parsed = parseAnsi(line.text);
    return (
      <div className="font-mono text-[#30D158]/60 whitespace-pre">
        {parsed.map((p, i) => <span key={i} className={p.className}>{p.text}</span>)}
      </div>
    );
  }
  // output
  if (!line.text) return <div className="h-1" />;
  const parsed = parseAnsi(line.text);
  return (
    <div className="font-mono whitespace-pre-wrap leading-relaxed">
      {parsed.map((p, i) => <span key={i} className={p.className}>{p.text}</span>)}
    </div>
  );
};

export const TerminalWindow = () => {
  const [lines, setLines] = useState<Line[]>(INITIAL_OUTPUT);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const runCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newLines: Line[] = [...lines, { type: 'input', text: cmd }];

    if (!trimmed) {
      setLines(newLines);
      return;
    }

    const handler = COMMANDS[trimmed];
    if (handler) {
      const result = handler();
      if (result === '__CLEAR__') {
        setLines(INITIAL_OUTPUT);
      } else {
        const outputLines = result.split('\n').map((t) => ({ type: 'output' as LineType, text: t }));
        setLines([...newLines, ...outputLines, { type: 'output', text: '' }]);
      }
    } else {
      setLines([...newLines, { type: 'error', text: `command not found: ${trimmed}` }, { type: 'output', text: '' }]);
    }

    setHistory((h) => [cmd, ...h]);
    setHistoryIdx(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      runCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(historyIdx + 1, history.length - 1);
      setHistoryIdx(next);
      setInput(history[next] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = Math.max(historyIdx - 1, -1);
      setHistoryIdx(next);
      setInput(next === -1 ? '' : history[next]);
    }
  };

  return (
    <div
      className="h-full flex flex-col text-[12.5px] cursor-text"
      style={{ background: 'linear-gradient(180deg, #0d1117 0%, #0a0e15 100%)' }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Top accent bar */}
      <div className="h-[1px] flex-shrink-0" style={{
        background: 'linear-gradient(90deg, #30D158, #007AFF, #BF5AF2, transparent)'
      }} />

      {/* Quick command chips */}
      <div
        className="flex items-center gap-1.5 px-4 py-2 flex-shrink-0 overflow-x-auto"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
      >
        <span className="text-[10px] text-white/20 mr-1 flex-shrink-0">Quick:</span>
        {['help', 'neofetch', 'skills', 'whoami', 'clear'].map((cmd) => (
          <button
            key={cmd}
            onClick={(e) => { e.stopPropagation(); runCommand(cmd); setInput(''); }}
            className="flex-shrink-0 px-2.5 py-0.5 rounded-md text-[10px] font-medium font-mono transition-all hover:scale-105"
            style={{
              background: 'rgba(48,209,88,0.08)',
              border: '1px solid rgba(48,209,88,0.15)',
              color: 'rgba(48,209,88,0.7)',
            }}
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* Terminal output */}
      <div className="flex-1 overflow-y-auto px-5 py-3 space-y-0.5">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.15, delay: Math.min(i * 0.01, 0.1) }}
          >
            <TerminalLine line={line} />
          </motion.div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div
        className="flex items-center gap-2 px-5 py-3 flex-shrink-0"
        style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          background: 'rgba(255,255,255,0.02)',
        }}
      >
        <span className="font-mono text-[#30D158] font-semibold">arsal</span>
        <span className="font-mono text-white/30">@</span>
        <span className="font-mono text-[#64ABFF] font-semibold">portfolio</span>
        <span className="font-mono text-white/30 mx-0.5">~</span>
        <span className="font-mono text-[#FF9F0A]">$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent font-mono text-white outline-none caret-[#30D158] placeholder-white/15"
          placeholder="type a command..."
          autoFocus
        />
        {input && (
          <kbd
            className="text-[9px] px-1.5 py-0.5 rounded font-mono flex-shrink-0"
            style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.3)' }}
          >
            ↵
          </kbd>
        )}
      </div>
    </div>
  );
};
