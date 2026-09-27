import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, Mail, AtSign, MessageSquare } from 'lucide-react';
import { social } from '../../data/social';
import Swal from 'sweetalert2';

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

const SOCIAL_COLORS: Record<string, { icon: string; color: string; bg: string }> = {
  LinkedIn:  { icon: '💼', color: '#0A66C2', bg: 'rgba(10,102,194,0.12)' },
  GitHub:    { icon: '🐙', color: '#fff',    bg: 'rgba(255,255,255,0.07)' },
  Instagram: { icon: '📸', color: '#E1306C', bg: 'rgba(225,48,108,0.12)' },
  YouTube:   { icon: '▶️', color: '#FF0000', bg: 'rgba(255,0,0,0.10)' },
};

const InputField = ({
  label, icon: Icon, type = 'text', name, value, onChange, placeholder, required,
}: {
  label: string;
  icon: React.ElementType;
  type?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
}) => (
  <div className="group">
    <label className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-medium mb-1.5"
      style={{ color: 'rgba(255,255,255,0.3)' }}>
      <Icon size={10} /> {label}
    </label>
    <div
      className="flex items-center gap-2 rounded-xl px-3 py-2.5 transition-all duration-200"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="flex-1 bg-transparent text-[13px] text-white placeholder-white/20 outline-none"
      />
    </div>
  </div>
);

export const MailWindow = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `Portfolio Message from ${formData.name}`,
        }),
      });
      const result = await res.json();
      if (result.success) {
        setSent(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSent(false), 3500);
      } else throw new Error();
    } catch {
      Swal.fire({
        icon: 'error', title: 'Failed to send', showConfirmButton: false,
        timer: 1500, background: '#1C1C1E', color: '#fff',
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex h-full">
      {/* Social sidebar */}
      <div
        className="w-44 flex-shrink-0 flex flex-col py-3 px-2"
        style={{
          background: 'rgba(255,255,255,0.015)',
          borderRight: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        {/* Avatar section */}
        <div
          className="mx-2 mb-4 p-3 rounded-2xl overflow-hidden relative"
          style={{
            background: 'linear-gradient(135deg, rgba(0,122,255,0.1), rgba(175,82,222,0.1))',
            border: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(175,82,222,0.25) 0%, transparent 70%)', filter: 'blur(12px)' }} />
          <img
            src="https://github.com/kanaee-cloud.png"
            alt="Arsal"
            className="w-10 h-10 rounded-xl mb-2 relative"
            style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.4)' }}
          />
          <p className="text-[12px] font-semibold text-white leading-tight">M. Arsal Nawfal Ali</p>
          <p className="text-[10px] mt-0.5" style={{ color: '#BF5AF2' }}>Full Stack Developer</p>
          <a
            href="mailto:arsalnaufal.dev@gmail.com"
            className="flex items-center gap-1 mt-2 text-[10px] transition-colors hover:text-[#007AFF]"
            style={{ color: 'rgba(255,255,255,0.3)' }}
          >
            <Mail size={9} /> arsalnaufal.dev@gmail.com
          </a>
        </div>

        <div className="text-[10px] uppercase tracking-widest font-medium px-2 mb-2"
          style={{ color: 'rgba(255,255,255,0.2)' }}>
          Find me on
        </div>

        {social.map((s, i) => {
          const meta = SOCIAL_COLORS[s.name] || { icon: '🔗', color: '#fff', bg: 'rgba(255,255,255,0.06)' };
          return (
            <a
              key={i}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl mx-0 mb-1 transition-all hover:scale-[1.02] group"
              style={{ background: 'transparent' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = meta.bg; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
            >
              <span className="text-[15px]">{meta.icon}</span>
              <span className="text-[12px] font-medium transition-colors" style={{ color: 'rgba(255,255,255,0.55)' }}>
                {s.name}
              </span>
            </a>
          );
        })}
      </div>

      {/* Compose area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div
          className="relative px-5 py-4 flex-shrink-0 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(0,122,255,0.07) 0%, rgba(175,82,222,0.05) 100%)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-[1px]"
            style={{ background: 'linear-gradient(90deg, #007AFF50, #BF5AF250, transparent)' }} />
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(0,122,255,0.15)', border: '1px solid rgba(0,122,255,0.25)' }}
            >
              <Mail size={14} style={{ color: '#007AFF' }} />
            </div>
            <div>
              <h2 className="text-[14px] font-semibold text-white leading-tight">New Message</h2>
              <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
                to: arsalnaufal.dev@gmail.com
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="flex-1 overflow-y-auto p-5">
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col items-center justify-center h-full gap-4 py-12"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(48,209,88,0.15)', border: '1px solid rgba(48,209,88,0.3)' }}
                >
                  <CheckCircle2 size={32} style={{ color: '#30D158' }} />
                </div>
                <div className="text-center">
                  <p className="text-[16px] font-semibold text-white mb-1">Message Sent!</p>
                  <p className="text-[12px]" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    I'll get back to you as soon as possible.
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 h-full"
              >
                <div className="grid grid-cols-2 gap-3">
                  <InputField
                    label="From"
                    icon={AtSign}
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                  />
                  <InputField
                    label="Reply To"
                    icon={Mail}
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                  />
                </div>

                {/* Message */}
                <div className="flex-1 group">
                  <label className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-medium mb-1.5"
                    style={{ color: 'rgba(255,255,255,0.3)' }}>
                    <MessageSquare size={10} /> Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message here…"
                    required
                    className="w-full h-full min-h-[100px] rounded-xl px-3 py-2.5 text-[13px] text-white placeholder-white/20 outline-none resize-none leading-relaxed transition-all duration-200"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.07)',
                    }}
                    onFocus={(e) => { e.currentTarget.style.border = '1px solid rgba(0,122,255,0.4)'; e.currentTarget.style.background = 'rgba(0,122,255,0.04)'; }}
                    onBlur={(e) => { e.currentTarget.style.border = '1px solid rgba(255,255,255,0.07)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
                  />
                </div>

                {/* Send button */}
                <div className="flex items-center justify-between pt-1">
                  <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.25)' }}>
                    Powered by Web3Forms
                  </p>
                  <button
                    type="submit"
                    disabled={isSending}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-semibold text-white transition-all hover:brightness-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ background: 'linear-gradient(135deg, #007AFF, #5E5CE6)' }}
                  >
                    {isSending ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send size={13} /> Send Message
                      </>
                    )}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
