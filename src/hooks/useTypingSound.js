import { useCallback } from 'react';

// Generate a tiny beep sound using Web Audio API
export default function useTypingSound() {
  const play = useCallback(() => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(
        800 + Math.random() * 200, // slight pitch variation
        ctx.currentTime
      );

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.08);
    } catch (e) {
      // Silently fail if audio not supported
    }
  }, []);

  return play;
}
