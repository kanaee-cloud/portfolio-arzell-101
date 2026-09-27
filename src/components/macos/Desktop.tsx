import { MacWindow } from './MacWindow';
import { WelcomeWindow } from '../windows/WelcomeWindow';
import { AboutWindow } from '../windows/AboutWindow';
import { FinderWindow } from '../windows/FinderWindow';
import { TerminalWindow } from '../windows/TerminalWindow';
import { CertificatesWindow } from '../windows/CertificatesWindow';
import { GitHubWindow } from '../windows/GitHubWindow';
import { MailWindow } from '../windows/MailWindow';
import { ChatBotWindow } from '../windows/ChatBotWindow';

const WINDOW_SIZES: Record<string, { width: number; height: number }> = {
  welcome:      { width: 680, height: 500 },
  about:        { width: 720, height: 560 },
  projects:     { width: 800, height: 560 },
  terminal:     { width: 680, height: 480 },
  certificates: { width: 760, height: 540 },
  github:       { width: 720, height: 560 },
  contact:      { width: 640, height: 500 },
  chatbot:      { width: 420, height: 560 },
};

export const Desktop = () => {
  return (
    <div
      className="fixed inset-0 overflow-hidden"
      style={{ top: 28, bottom: 72 }}
    >
      {/* ── macOS Ventura Dark Wallpaper — fixed so it covers full screen incl. behind menubar & dock ── */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: 'url(/assets/wallpaper.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* ── Windows ── */}
      <MacWindow id="welcome"      defaultWidth={WINDOW_SIZES.welcome.width}      defaultHeight={WINDOW_SIZES.welcome.height}>
        <WelcomeWindow />
      </MacWindow>
      <MacWindow id="about"        defaultWidth={WINDOW_SIZES.about.width}        defaultHeight={WINDOW_SIZES.about.height}>
        <AboutWindow />
      </MacWindow>
      <MacWindow id="projects"     defaultWidth={WINDOW_SIZES.projects.width}     defaultHeight={WINDOW_SIZES.projects.height}>
        <FinderWindow />
      </MacWindow>
      <MacWindow id="terminal"     defaultWidth={WINDOW_SIZES.terminal.width}     defaultHeight={WINDOW_SIZES.terminal.height}>
        <TerminalWindow />
      </MacWindow>
      <MacWindow id="certificates" defaultWidth={WINDOW_SIZES.certificates.width} defaultHeight={WINDOW_SIZES.certificates.height}>
        <CertificatesWindow />
      </MacWindow>
      <MacWindow id="github"       defaultWidth={WINDOW_SIZES.github.width}       defaultHeight={WINDOW_SIZES.github.height}>
        <GitHubWindow />
      </MacWindow>
      <MacWindow id="contact"      defaultWidth={WINDOW_SIZES.contact.width}      defaultHeight={WINDOW_SIZES.contact.height}>
        <MailWindow />
      </MacWindow>
      <MacWindow id="chatbot"      defaultWidth={WINDOW_SIZES.chatbot.width}      defaultHeight={WINDOW_SIZES.chatbot.height}>
        <ChatBotWindow />
      </MacWindow>
    </div>
  );
};
