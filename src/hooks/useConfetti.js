import confetti from 'canvas-confetti';

export default function useConfetti() {
  const fire = () => {
    const colors = ['#6c63ff', '#00d4ff', '#00ff88', '#ff4d8d', '#f7df1e'];

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors,
      startVelocity: 35,
      gravity: 0.8,
      scalar: 1.2,
    });

    setTimeout(() => {
      confetti({
        particleCount: 40,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors,
      });
      confetti({
        particleCount: 40,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors,
      });
    }, 200);
  };

  return fire;
}
