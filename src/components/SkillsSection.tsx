import { useEffect, useRef } from 'react';

const allSkills = [
  { name: 'Python', color: '#3776AB', svg: <svg viewBox="0 0 128 128" className="w-6 h-6"><path fill="#3776AB" d="M63.391 1.988c-4.222.02-8.252.379-11.8 1.007-10.45 1.846-12.346 5.71-12.346 12.837v9.411h24.693v3.137H29.977c-7.176 0-13.46 4.313-15.426 12.521-2.268 9.405-2.368 15.275 0 25.096 1.755 7.311 5.947 12.519 13.124 12.519h8.491V67.234c0-8.151 7.051-15.34 15.426-15.34h24.665c6.866 0 12.346-5.654 12.346-12.548V15.833c0-6.693-5.646-11.72-12.346-12.837-4.244-.706-8.645-1.027-12.866-1.008zM50.037 9.557c2.55 0 4.634 2.117 4.634 4.721 0 2.593-2.083 4.69-4.634 4.69-2.56 0-4.633-2.097-4.633-4.69-.001-2.604 2.073-4.721 4.633-4.721z"/><path fill="#FFD43B" d="M91.682 28.38v10.966c0 8.5-7.208 15.655-15.426 15.655H51.591c-6.756 0-12.346 5.783-12.346 12.549v23.515c0 6.691 5.818 10.628 12.346 12.547 7.816 2.297 15.312 2.713 24.665 0 6.216-1.801 12.346-5.423 12.346-12.547v-9.412H63.938v-3.138h37.012c7.176 0 9.852-5.005 12.348-12.519 2.578-7.735 2.467-15.174 0-25.096-1.774-7.145-5.161-12.521-12.348-12.521h-9.268zM77.809 87.927c2.561 0 4.634 2.097 4.634 4.692 0 2.602-2.074 4.719-4.634 4.719-2.55 0-4.633-2.117-4.633-4.719 0-2.595 2.083-4.692 4.633-4.692z"/></svg> },
  { name: 'JavaScript', color: '#F7DF1E', svg: <svg viewBox="0 0 128 128" className="w-6 h-6"><rect width="128" height="128" rx="8" fill="#F7DF1E"/><path fill="#000" d="M2 1h125v125H2V1zm66.119 106.513c1.845 3.749 4.39 6.856 9.117 6.856 5.368 0 8.583-2.768 8.583-6.583 0-4.575-3.434-6.19-9.143-8.85l-3.148-1.345c-9.068-3.868-15.104-8.718-15.104-18.97 0-9.42 7.182-16.6 18.384-16.6 7.987 0 13.718 2.778 17.854 10.063l-9.774 6.27c-2.145-3.85-4.46-5.368-8.084-5.368-3.681 0-6.022 2.34-6.022 5.368 0 3.757 2.34 5.293 7.765 7.628l3.148 1.345c10.678 4.568 16.755 9.25 16.755 19.756 0 11.338-8.903 17.476-20.875 17.476-11.701 0-19.281-5.581-22.987-12.891l10.536-6.031zm-48.574.4c1.35 2.388 2.576 4.408 5.501 4.408 2.806 0 4.576-1.096 4.576-5.37V63.672h12.146v44.084c0 8.849-5.186 12.874-12.762 12.874-6.852 0-10.822-3.554-12.853-7.828l3.392-10.889z"/></svg> },
  { name: 'HTML', color: '#E34F26', svg: <svg viewBox="0 0 128 128" className="w-6 h-6"><path fill="#E44D26" d="M19.037 113.876L9.032 1.255h109.936l-10.016 112.61-45.019 12.454z"/><path fill="#F16529" d="M64 116.8l36.378-10.086 8.559-95.878H64z"/><path fill="#EBEBEB" d="M64 52.455H45.788L44.53 38.361H64V24.599H29.489l.33 3.692 3.382 37.927H64zm0 35.743l-.061.017-15.327-4.14-.979-10.975H33.816l1.928 21.609 28.193 7.826.063-.017z"/><path fill="#fff" d="M63.952 52.455v13.763h16.947l-1.597 17.849-15.35 4.143v14.319l28.215-7.82.207-2.325 3.234-36.233.336-3.696h-3.708zm0-27.856v13.762h33.244l.276-3.092.628-6.978.329-3.692z"/></svg> },
  { name: 'CSS', color: '#1572B6', svg: <svg viewBox="0 0 128 128" className="w-6 h-6"><path fill="#1572B6" d="M18.814 114.123L8.76 1.352h110.48l-10.064 112.754-45.243 12.543-45.119-12.526z"/><path fill="#33A9DC" d="M64.001 117.062l36.559-10.136 8.601-96.354H64.001v106.49z"/><path fill="#fff" d="M64.001 51.429h18.302l1.264-14.163H64.001V23.435h31.943l-.329 3.701-3.382 37.927H64.001V51.429z"/><path fill="#EBEBEB" d="M64.001 87.185l-.063.018-15.243-4.12-.977-10.946H33.806l1.928 21.6 28.193 7.825.074-.02V87.185z"/></svg> },
  { name: 'PyTorch', color: '#EE4C2C', svg: <svg viewBox="0 0 128 128" className="w-6 h-6"><path fill="#EE4C2C" d="M64.005 12L31.61 44.39a45.887 45.887 0 000 64.942 45.887 45.887 0 0064.942 0 45.887 45.887 0 000-64.942L82.91 58.033a23.943 23.943 0 010 33.891 23.943 23.943 0 01-33.891 0 23.943 23.943 0 010-33.891L64.005 12z"/><circle fill="#EE4C2C" cx="82.428" cy="44.390" r="5.96"/></svg> },
  { name: 'TensorFlow', color: '#FF6F00', svg: <svg viewBox="0 0 128 128" className="w-6 h-6"><path fill="#FF6F00" d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64 64-28.7 64-64S99.3 0 64 0zm-8 93.6L36 80.1V55.3l20 11.5v26.8zm4-32.3L40 49.8V25l20 11.5 20-11.5v24.8l-20 11.5zm24 32.3L64 105l-20-11.4V66.8l20-11.5 20 11.5v26.8z"/></svg> },
  { name: 'Keras', color: '#D00000', svg: <svg viewBox="0 0 128 128" className="w-6 h-6"><circle cx="64" cy="64" r="60" fill="#D00000"/><path fill="#fff" d="M44 28v72l16-28 24 28V28H68v48l-8-12-8 12V28z"/></svg> },
  { name: 'scikit-learn', color: '#F7931E', svg: <svg viewBox="0 0 128 128" className="w-6 h-6"><circle cx="64" cy="64" r="60" fill="#F7931E"/><path fill="#fff" d="M36 52a16 16 0 1132 0 16 16 0 01-32 0zm8 28c0-6 8-10 20-10s20 4 20 10v4H44v-4z"/></svg> },
  { name: 'NumPy', color: '#4DABCF', svg: <svg viewBox="0 0 128 128" className="w-6 h-6"><path fill="#4DABCF" d="M60.518 16.354l-33.76 19.494v13.645l33.76-19.49V16.354zm6.964 0v13.649l33.76 19.49V36.147L67.482 16.354zM26.758 55.56v13.648l33.76 19.49V75.052L26.758 55.56zm74.484 0L67.482 75.053v13.645l33.76-19.49V55.56zM26.758 75.52v13.648L60.518 108.66V95.011L26.758 75.52zm74.484 0l-33.76 19.491V108.66l33.76-19.49V75.52z"/></svg> },
  { name: 'Pandas', color: '#E70488', svg: <svg viewBox="0 0 128 128" className="w-6 h-6"><rect width="128" height="128" rx="8" fill="#130654"/><rect x="46" y="20" width="13" height="36" rx="4" fill="#E70488"/><rect x="69" y="20" width="13" height="36" rx="4" fill="#E70488"/><rect x="40" y="44" width="48" height="13" rx="4" fill="#E70488"/><rect x="46" y="72" width="13" height="36" rx="4" fill="#E70488"/><rect x="69" y="72" width="13" height="36" rx="4" fill="#E70488"/><rect x="40" y="72" width="48" height="13" rx="4" fill="#E70488"/></svg> },
  { name: 'OpenCV', color: '#5C3EE8', svg: <svg viewBox="0 0 128 128" className="w-6 h-6"><circle cx="64" cy="36" r="22" fill="#5C3EE8"/><circle cx="30" cy="94" r="22" fill="#3CB371"/><circle cx="98" cy="94" r="22" fill="#E74C3C"/><circle cx="64" cy="36" r="8" fill="#fff"/><circle cx="30" cy="94" r="8" fill="#fff"/><circle cx="98" cy="94" r="8" fill="#fff"/></svg> },
  { name: 'Matplotlib', color: '#11557C', svg: <svg viewBox="0 0 128 128" className="w-6 h-6"><circle cx="64" cy="64" r="60" fill="#11557C"/><path d="M20 95 Q40 38 64 58 Q88 78 108 30" stroke="#F7931E" strokeWidth="5" fill="none" strokeLinecap="round"/></svg> },
  { name: 'Flask', color: '#FFFFFF', svg: <svg viewBox="0 0 128 128" className="w-6 h-6"><path fill="#fff" d="M75 20c0-6-4-11-11-11S53 14 53 20l-4 6H35l-5 12 8 52h50l8-52-5-12H57l-4-6zm-11 3c2.8 0 5 2.2 5 5s-2.2 5-5 5-5-2.2-5-5 2.2-5 5-5z"/></svg> },
  { name: 'React', color: '#61DAFB', svg: <svg viewBox="0 0 128 128" className="w-6 h-6"><circle cx="64" cy="64" r="11.4" fill="#61DAFB"/><ellipse cx="64" cy="64" rx="55" ry="20" fill="none" stroke="#61DAFB" strokeWidth="5"/><ellipse cx="64" cy="64" rx="55" ry="20" fill="none" stroke="#61DAFB" strokeWidth="5" transform="rotate(60 64 64)"/><ellipse cx="64" cy="64" rx="55" ry="20" fill="none" stroke="#61DAFB" strokeWidth="5" transform="rotate(120 64 64)"/></svg> },
  { name: 'Git', color: '#F05032', svg: <svg viewBox="0 0 128 128" className="w-6 h-6"><path fill="#F05032" d="M124.737 58.378L69.621 3.264c-3.172-3.174-8.32-3.174-11.497 0L46.68 14.71l14.518 14.518c3.375-1.139 7.243-.375 9.932 2.314 2.703 2.706 3.461 6.607 2.294 9.993l13.992 13.993c3.385-1.167 7.292-.413 9.994 2.295 3.78 3.777 3.78 9.9 0 13.679a9.673 9.673 0 01-13.683 0 9.677 9.677 0 01-2.105-10.521L68.574 47.933l-.001 32.134a9.708 9.708 0 012.559 1.828c3.778 3.777 3.778 9.9 0 13.679-3.779 3.778-9.901 3.778-13.678 0-3.779-3.779-3.779-9.901 0-13.679a9.658 9.658 0 013.167-2.11V47.333a9.658 9.658 0 01-3.167-2.11c-2.718-2.72-3.462-6.662-2.251-10.061L41.181 21.159 3.264 59.073c-3.174 3.177-3.174 8.32 0 11.496l55.117 55.118c3.174 3.174 8.32 3.174 11.499 0L124.737 69.873c3.175-3.176 3.175-8.319 0-11.495z"/></svg> },
  { name: 'GitHub', color: '#FFFFFF', svg: <svg viewBox="0 0 128 128" className="w-6 h-6"><path fill="#fff" d="M64 5.103c-33.347 0-60.388 27.035-60.388 60.388 0 26.682 17.303 49.317 41.297 57.303 3.017.56 4.125-1.31 4.125-2.905 0-1.44-.056-6.197-.082-11.243-16.8 3.653-20.345-7.125-20.345-7.125-2.747-6.98-6.705-8.836-6.705-8.836-5.48-3.748.413-3.67.413-3.67 6.063.425 9.257 6.223 9.257 6.223 5.386 9.23 14.127 6.562 17.573 5.02.542-3.903 2.107-6.568 3.834-8.076-13.413-1.525-27.514-6.704-27.514-29.843 0-6.593 2.36-11.98 6.223-16.21-.628-1.52-2.695-7.662.584-15.98 0 0 5.07-1.623 16.61 6.19C53.7 35 58.867 34.327 64 34.304c5.13.023 10.3.694 15.127 2.033 11.526-7.813 16.59-6.19 16.59-6.19 3.287 8.317 1.22 14.46.593 15.98 3.872 4.23 6.215 9.617 6.215 16.21 0 23.194-14.127 28.3-27.574 29.796 2.167 1.874 4.097 5.55 4.097 11.183 0 8.08-.07 14.583-.07 16.572 0 1.607 1.088 3.49 4.148 2.897 23.98-7.994 41.263-30.622 41.263-57.294C124.388 32.14 97.35 5.104 64 5.104z"/></svg> },
  { name: 'Jupyter', color: '#F37626', svg: <svg viewBox="0 0 128 128" className="w-6 h-6"><circle cx="64" cy="64" r="60" fill="#1A1A2E"/><ellipse cx="64" cy="64" rx="44" ry="16" fill="none" stroke="#F37626" strokeWidth="5"/><circle cx="64" cy="20" r="7" fill="#F37626"/><circle cx="20" cy="88" r="7" fill="#9E6DC2"/><circle cx="108" cy="88" r="7" fill="#6CACDE"/></svg> },
  { name: 'Firebase', color: '#FFCA28', svg: <svg viewBox="0 0 128 128" className="w-6 h-6"><path fill="#FFA000" d="M22 109L38 28l22 41z"/><path fill="#F57F17" d="M106 109L90 28l-22 41z"/><path fill="#FFCA28" d="M64 15l-42 94 42 12 42-12z"/><path fill="#FFA000" d="M64 98l-28 11 28 8 28-8z"/></svg> },
  { name: 'Vercel', color: '#FFFFFF', svg: <svg viewBox="0 0 128 128" className="w-6 h-6"><path fill="#fff" d="M64 10L6 118h116L64 10z"/></svg> },
  { name: 'Librosa', color: '#4B9CD3', svg: <svg viewBox="0 0 128 128" className="w-6 h-6"><circle cx="64" cy="64" r="60" fill="#1A1A2E"/><path d="M16 80 Q28 44 40 65 Q52 86 64 48 Q76 10 88 60 Q100 92 112 56" stroke="#4B9CD3" strokeWidth="4" fill="none" strokeLinecap="round"/></svg> },
];

// Split into 3 rows for staggered marquee
const row1 = allSkills.slice(0, 7);
const row2 = allSkills.slice(7, 14);
const row3 = allSkills.slice(14);

const MarqueeRow = ({ items, reverse = false, speed = 30 }: { items: typeof allSkills; reverse?: boolean; speed?: number }) => {
  const doubled = [...items, ...items, ...items]; // triple for seamless loop
  return (
    <div className="overflow-hidden w-full">
      <div
        className={`flex gap-5 w-max`}
        style={{
          animation: `marquee${reverse ? 'Rev' : ''} ${speed}s linear infinite`,
        }}
      >
        {doubled.map((skill, i) => (
          <div
            key={`${skill.name}-${i}`}
            className="group flex items-center gap-4 px-7 py-5 rounded-2xl bg-card/20 border border-border/25 backdrop-blur-sm hover:border-primary/40 hover:bg-card/40 transition-all duration-300 cursor-default flex-shrink-0"
          >
            <div className="w-12 h-12 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
              {skill.svg}
            </div>
            <span className="text-base font-semibold text-muted-foreground group-hover:text-foreground transition-colors duration-300 whitespace-nowrap">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0, rootMargin: '0px 0px -60px 0px' }
    );
    const elements = sectionRef.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="pt-24 pb-64 min-h-screen relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-1/3 -right-1/4 w-[50vw] h-[50vw] rounded-full bg-primary/5 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 -left-1/4 w-[40vw] h-[40vw] rounded-full bg-secondary/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-5xl px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20 reveal">
          <p className="inline-flex items-center gap-3 text-primary font-mono text-xs tracking-[0.3em] uppercase mb-6">
            <span className="w-5 h-px bg-primary/60" />
            02 — Technical Arsenal
            <span className="w-5 h-px bg-primary/60" />
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Skills &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Expertise
            </span>
          </h2>
          <div className="w-12 h-[2px] bg-primary/50 mx-auto rounded-full" />
        </div>
      </div>

      {/* Full-width marquee rows with edge fades */}
      <div className="relative reveal">
        {/* Left & right fade masks */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-32 z-10 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-32 z-10 bg-gradient-to-l from-background to-transparent" />

        <div className="flex flex-col gap-6">
          <MarqueeRow items={row1} speed={35} />
          <MarqueeRow items={row2} reverse speed={28} />
          <MarqueeRow items={row3} speed={40} />
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes marqueeRev {
          0%   { transform: translateX(-33.333%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
};

export default SkillsSection;