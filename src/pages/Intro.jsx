import { useEffect, useState } from 'react';

const WRITE_MS = 2600;
const HOLD_MS = 900;
const FADE_MS = 700;

const HELLO_PATH =
  'M40 182 C62 172 84 150 98 108 C110 74 120 40 104 34 C88 28 80 62 82 110 C84 150 78 180 78 196 C80 165 92 124 120 124 C148 124 152 156 150 184 C150 196 164 196 176 178 C186 160 196 132 216 128 C240 124 238 150 212 158 C190 165 180 178 192 188 C206 198 228 186 240 168 C248 156 252 140 256 100 C260 62 272 32 284 36 C298 42 286 90 278 130 C272 160 268 186 282 192 C296 196 306 182 314 170 C322 156 328 120 334 90 C340 58 352 30 364 36 C378 42 366 90 358 130 C352 160 348 186 362 192 C376 196 386 184 394 170 C404 150 422 132 442 134 C468 138 468 186 438 190 C412 192 410 150 442 138 C466 130 482 144 498 150';

export default function Intro({ onDone }) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    const showFor = reduce ? 1200 : WRITE_MS + HOLD_MS;

    const t1 = setTimeout(() => setLeaving(true), showFor);
    const t2 = setTimeout(() => onDone?.(), showFor + FADE_MS);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onDone]);

  const skip = () => {
    setLeaving(true);
    setTimeout(() => onDone?.(), FADE_MS);
  };

  return (
    <div
      onClick={skip}
      role="status"
      aria-label="Hello"
      className={`fixed inset-0 z-50 flex cursor-pointer items-center justify-center
        bg-stone-50 text-neutral-900 dark:bg-neutral-950 dark:text-stone-100
        transition-opacity ease-out ${leaving ? 'opacity-0' : 'opacity-100'}`}
      style={{ transitionDuration: `${FADE_MS}ms` }}
    >
      <style>{`
        .hello-stroke {
          fill: none;
          stroke: currentColor;
          stroke-width: 10;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: hello-write ${WRITE_MS}ms cubic-bezier(.5,.1,.4,1) forwards;
        }
        @keyframes hello-write { to { stroke-dashoffset: 0; } }
        @media (prefers-reduced-motion: reduce) {
          .hello-stroke { animation: none; stroke-dashoffset: 0; }
        }
      `}</style>

      <svg
        viewBox="10 10 520 210"
        className="w-[70vw] max-w-xl"
        aria-hidden="true"
      >
        <path className="hello-stroke" pathLength="1" d={HELLO_PATH} />
      </svg>
    </div>
  );
}
