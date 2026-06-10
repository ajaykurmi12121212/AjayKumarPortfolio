import { MessageCircle } from 'lucide-react';
import { useState } from 'react';

export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);
  const phone = '919548093277';
  const msg = encodeURIComponent("Hi Ajay! I came across your portfolio and I'm interested in discussing a potential opportunity.");

  return (
    <a
      href={`https://wa.me/${phone}?text=${msg}`}
      target="_blank"
      rel="noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="fixed bottom-24 right-8 z-50 flex items-center gap-3 transition-all duration-300 hover:-translate-y-1"
      aria-label="Chat on WhatsApp"
    >
      {/* Tooltip */}
      <div className={`transition-all duration-300 overflow-hidden whitespace-nowrap ${hovered ? 'max-w-[160px] opacity-100' : 'max-w-0 opacity-0'}`}>
        <div className="bg-[#0c0c1e] border border-white/[0.08] rounded-xl px-3 py-2 text-white text-xs font-medium shadow-xl">
          Chat on WhatsApp
        </div>
      </div>

      {/* Button */}
      <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg transition-all duration-300"
        style={{
          background: 'linear-gradient(135deg, #25d366, #128c7e)',
          boxShadow: hovered ? '0 8px 24px rgba(37,211,102,0.5)' : '0 4px 16px rgba(37,211,102,0.3)',
        }}>
        <MessageCircle size={22} fill="white" />
      </div>
    </a>
  );
}
