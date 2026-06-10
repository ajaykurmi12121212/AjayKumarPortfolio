import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, Phone, MapPin, ArrowUpRight, Send, CheckCircle, AlertCircle, Loader, Copy, Check } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons.jsx';
import { personalInfo } from '../data/index.js';
import useReveal from '../hooks/useReveal.js';

function CopyEmailButton() {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={copy}
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/[0.08] text-[#5050a0] hover:text-[#9b95ff] hover:border-[#6c63ff]/30 transition-all duration-300 text-xs font-medium"
      title="Copy email">
      {copied ? <Check size={12} className="text-[#00ff88]" /> : <Copy size={12} />}
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}

// ── EmailJS config — apni values yahan daal ──
const EMAILJS_SERVICE_ID  = 'service_f6i3r27';
const EMAILJS_TEMPLATE_ID = 'template_b2b0mpb';
const EMAILJS_PUBLIC_KEY  = 'FBa4O8CEoGudQ98Ur';

const contactLinks = [
  { icon: <Mail size={15} />,       label: 'Email',    value: personalInfo.email,  href: `mailto:${personalInfo.email}`,  color: '#6c63ff' },
  { icon: <Phone size={15} />,      label: 'Phone',    value: personalInfo.phone,  href: `tel:${personalInfo.phone}`,     color: '#00d4ff' },
  { icon: <GithubIcon size={15} />, label: 'GitHub',   value: 'ajaykurmi12121212', href: personalInfo.github,             color: '#9b95ff' },
  { icon: <LinkedinIcon size={15}/>, label: 'LinkedIn', value: 'ajay-kumar',       href: personalInfo.linkedin,           color: '#00ff88' },
];

export default function Contact() {
  const formRef  = useRef();
  const leftRef  = useReveal();
  const rightRef = useReveal();

  const [form, setForm]     = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [error, setError]   = useState('');

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError('Name, email aur message required hai.');
      return;
    }
    setStatus('loading');
    setError('');
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name:    form.name,
          email:   form.email,
          title:   form.subject || '(No subject)',
          message: form.message,
        },
        EMAILJS_PUBLIC_KEY
      );
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
      setError('Message not sent. Try again later.');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <section id="contact" className="py-28 px-6 bg-[#05050f] relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full bg-[#6c63ff] opacity-[0.04] blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Label */}
        <div className="flex items-center gap-4 mb-6">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-white/[0.05]" />
          <span className="text-[#6c63ff] text-[11px] font-semibold tracking-[4px] uppercase">Contact</span>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-white/[0.05]" />
        </div>

        <div className="grid lg:grid-cols-2 gap-14 mt-10">

          {/* ── Left — info ── */}
          <div ref={leftRef} className="reveal-left">
            <h2 className="font-black leading-tight mb-4" style={{ fontFamily:'DM Sans', fontSize:'clamp(34px,5vw,50px)' }}>
              <span className="text-white">Let's build </span>
              <span className="grad-text">something</span>
              <span className="text-white"> great</span>
            </h2>
            <p className="text-[#5050a0] text-[15px] leading-relaxed mb-3">
              Open to <span className="text-white font-medium">Software Developer, Full-Stack & Frontend roles.</span>
            </p>
            <div className="flex items-center gap-2 text-[#3a3a70] text-sm mb-10">
              <MapPin size={12} />
              <span>Greater Noida — open to {personalInfo.preferred}</span>
            </div>

            {/* Availability */}
            <div className="inline-flex items-center gap-3 rounded-2xl px-5 py-3 border mb-10"
              style={{ background:'rgba(0,255,136,0.05)', borderColor:'rgba(0,255,136,0.18)' }}>
              <span className="animate-pulse-ring w-2.5 h-2.5 rounded-full bg-[#00ff88] flex-shrink-0" />
              <div>
                <div className="text-[#00ff88] font-semibold text-sm">Immediate Joiner</div>
                <div className="text-[#00ff88]/50 text-xs">{personalInfo.ctc} · Full-Time</div>
              </div>
            </div>

            {/* Contact cards */}
            <div className="flex flex-col gap-2.5">
              {contactLinks.map(l => (
                <a key={l.label} href={l.href}
                  target={l.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="group flex items-center gap-3.5 rounded-xl p-3.5 border transition-all duration-300 hover:-translate-y-0.5"
                  style={{ background: l.color + '07', borderColor: l.color + '18' }}
                >
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: l.color + '14', color: l.color }}>
                    {l.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[#3a3a70] text-[10px] uppercase tracking-wider font-medium">{l.label}</div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-semibold truncate" style={{ color: l.color }}>{l.value}</div>
                      {l.label === 'Email' && <CopyEmailButton />}
                    </div>
                  </div>
                  <ArrowUpRight size={13} className="flex-shrink-0 opacity-30 group-hover:opacity-70 transition-opacity" style={{ color: l.color }} />
                </a>
              ))}
            </div>
          </div>

          {/* ── Right — form ── */}
          <div ref={rightRef} className="reveal-right">
            <div className="bg-[#0a0a1e] border border-white/[0.06] rounded-3xl p-7"
              style={{ boxShadow: '0 40px 80px rgba(0,0,0,0.3)' }}>

              <div className="mb-6">
                <h3 className="text-white font-bold text-xl mb-1" style={{ fontFamily:'DM Sans' }}>Send a Message</h3>
                
              </div>

              {/* Success */}
              {status === 'success' && (
                <div className="flex items-center gap-3 bg-[#00ff88]/10 border border-[#00ff88]/25 rounded-xl px-4 py-3 mb-5">
                  <CheckCircle size={16} className="text-[#00ff88] flex-shrink-0" />
                  <span className="text-[#00ff88] text-sm font-medium">Message sent successfully! 🙌</span>
                </div>
              )}

              {/* Error */}
              {(status === 'error' || error) && (
                <div className="flex items-center gap-3 bg-[#ff4d8d]/10 border border-[#ff4d8d]/25 rounded-xl px-4 py-3 mb-5">
                  <AlertCircle size={16} className="text-[#ff4d8d] flex-shrink-0" />
                  <span className="text-[#ff4d8d] text-sm">{error || ' Error.'}</span>
                </div>
              )}

              <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[#4040a0] text-xs font-medium uppercase tracking-wider mb-2 block">Name *</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Enter name"
                      className="w-full bg-white/[0.03] border border-white/[0.07] rounded-xl px-4 py-3 text-white text-sm placeholder-[#3a3a70] focus:outline-none focus:border-[#6c63ff]/50 focus:bg-[#6c63ff]/5 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="text-[#4040a0] text-xs font-medium uppercase tracking-wider mb-2 block">Email *</label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Enter email"
                      className="w-full bg-white/[0.03] border border-white/[0.07] rounded-xl px-4 py-3 text-white text-sm placeholder-[#3a3a70] focus:outline-none focus:border-[#6c63ff]/50 focus:bg-[#6c63ff]/5 transition-all duration-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[#4040a0] text-xs font-medium uppercase tracking-wider mb-2 block">Subject</label>
                  <input
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Enter subject (optional)"
                    className="w-full bg-white/[0.03] border border-white/[0.07] rounded-xl px-4 py-3 text-white text-sm placeholder-[#3a3a70] focus:outline-none focus:border-[#6c63ff]/50 focus:bg-[#6c63ff]/5 transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="text-[#4040a0] text-xs font-medium uppercase tracking-wider mb-2 block">Message *</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Enter your message"
                    rows={5}
                    className="w-full bg-white/[0.03] border border-white/[0.07] rounded-xl px-4 py-3 text-white text-sm placeholder-[#3a3a70] focus:outline-none focus:border-[#6c63ff]/50 focus:bg-[#6c63ff]/5 transition-all duration-300 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="group flex items-center justify-center gap-2.5 w-full py-3.5 rounded-xl font-semibold text-white text-sm transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  style={{ background: 'linear-gradient(135deg,#6c63ff,#00d4ff)' }}
                >
                  {status === 'loading' ? (
                    <>
                      <Loader size={15} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                      Send Message
                    </>
                  )}
                </button>

               
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
