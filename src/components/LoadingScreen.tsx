import { useState, useEffect } from 'react';
import gsap from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [linesVisible, setLinesVisible] = useState([false, false, false, false]);

  useEffect(() => {
    // Stage 1: Line-by-line code reveal
    const lineTimeouts = [
      setTimeout(() => setLinesVisible(p => [true, p[1], p[2], p[3]]), 100),
      setTimeout(() => setLinesVisible(p => [p[0], true, p[2], p[3]]), 400),
      setTimeout(() => setLinesVisible(p => [p[0], p[1], true, p[3]]), 700),
      setTimeout(() => setLinesVisible(p => [p[0], p[1], p[2], true]), 1000)
    ];

    // Stage 2: Start fake loading progress
    let startProgressTimeout = setTimeout(() => {
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += Math.floor(Math.random() * 8) + 4;
        
        if (currentProgress >= 100) {
          currentProgress = 100;
          clearInterval(interval);
          
          // Smooth GSAP fade out
          setTimeout(() => {
            const loader = document.getElementById('loader-overlay');
            if (loader) {
              gsap.to(loader, {
                opacity: 0,
                duration: 0.5,
                ease: 'power2.inOut',
                onComplete: () => {
                  setVisible(false);
                  onComplete();
                }
              });
            } else {
              setVisible(false);
              onComplete();
            }
          }, 300);
        }
        setProgress(Math.min(currentProgress, 100));
      }, 60);

      return () => clearInterval(interval);
    }, 1200);

    return () => {
      lineTimeouts.forEach(clearTimeout);
      clearTimeout(startProgressTimeout);
    };
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div
      id="loader-overlay"
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#020617] overflow-hidden"
    >
      <div className="text-center flex flex-col items-center max-w-sm px-6">
        {/* Loader Code Text */}
        <div className="font-mono text-sm sm:text-base text-[#c084fc] mb-8 select-none text-left w-full max-w-[280px]">
          <div
            className={`transition-all duration-500 ease-out transform ${
              linesVisible[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <span className="text-[#a78bfa]">const</span> portfolio <span className="text-[#67e8f9]">=</span> <span className="text-[#fbbf24]">{'{'}</span>
          </div>
          <div
            className={`pl-6 transition-all duration-500 ease-out transform ${
              linesVisible[1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            loading<span className="text-[#67e8f9]">:</span> <span className="text-[#fbbf24]">true</span><span className="text-slate-400">,</span>
          </div>
          <div
            className={`pl-6 transition-all duration-500 ease-out transform ${
              linesVisible[2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            status<span className="text-[#67e8f9]">:</span> <span className="text-[#86efac]">'initializing...'</span>
          </div>
          <div
            className={`transition-all duration-500 ease-out transform ${
              linesVisible[3] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <span className="text-[#fbbf24]">{'}'}</span><span className="text-[#a78bfa]">;</span>
          </div>
        </div>

        {/* Spinner */}
        <div className="my-6">
          <div
            className="w-[60px] h-[60px] border-[3px] border-slate-800 rounded-full animate-spin"
            style={{
              borderTopColor: '#c084fc',
              borderRightColor: '#67e8f9',
            }}
          />
        </div>

        {/* Progress Bar Wrapper */}
        <div className="w-[200px] h-[4px] bg-slate-800 rounded-full overflow-hidden my-4 relative">
          <div
            className="h-full bg-gradient-to-r from-[#c084fc] via-[#a78bfa] to-[#67e8f9] transition-all duration-75 ease-out shadow-[0_0_10px_#c084fc]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Percentage Counter */}
        <div className="font-mono text-[#c084fc] text-sm mt-2">
          {progress}%
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
