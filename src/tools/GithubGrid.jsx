import { useEffect, useMemo, useRef, useState } from 'react';
import { profile } from '../ui/data/Profile';

const CELL = 20; // target cell size in px; the number of weeks shown follows the column width
const DOT = [4, 7, 10, 14, 18]; // dot diameter for contribution levels 0–4
const BLANK = { date: '', count: 0, level: 0 };

const usernameFrom = (url) => {
  try {
    return new URL(url).pathname.split('/').filter(Boolean)[0] ?? '';
  } catch {
    return '';
  }
};

// Days (oldest first) -> weeks of 7, Sunday first, padded to full weeks.
function toWeeks(days) {
  if (days.length === 0) return [];
  const lead = new Date(`${days[0].date}T00:00:00`).getDay();
  const cells = [...Array(lead).fill(null), ...days];
  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  const last = weeks[weeks.length - 1];
  while (last.length < 7) last.push(null);
  return weeks;
}

function useWidth() {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) =>
      setWidth(entry.contentRect.width),
    );
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return [ref, width];
}

export default function GithubGrid() {
  const user = usernameFrom(profile.github);
  const [days, setDays] = useState(null);
  const [status, setStatus] = useState(user ? 'loading' : 'error');
  const [gridRef, width] = useWidth();

  useEffect(() => {
    if (!user) return;
    const ctrl = new AbortController();

    fetch(`https://github-contributions-api.jogruber.de/v4/${user}?y=last`, {
      signal: ctrl.signal,
    })
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.json();
      })
      .then((json) => {
        setDays(
          [...json.contributions].sort((a, b) => a.date.localeCompare(b.date)),
        );
        setStatus('ready');
      })
      .catch((err) => {
        if (err.name !== 'AbortError') setStatus('error');
      });

    return () => ctrl.abort();
  }, [user]);

  const cols = Math.max(8, Math.floor(width / CELL));
  const weeks = useMemo(() => (days ? toWeeks(days) : []), [days]);
  const total = useMemo(
    () => (days ? days.reduce((n, d) => n + d.count, 0) : 0),
    [days],
  );

  const visible =
    status === 'ready'
      ? weeks.slice(-cols) // most recent weeks that fit
      : Array.from({ length: cols }, () => Array(7).fill(BLANK));

  const caption = {
    loading: 'Loading contributions…',
    error: "Contribution data isn't available right now",
    ready: `${total} contributions in the last year`,
  }[status];

  return (
    <section>
      <h2 className="text-sm font-medium tracking-widest text-neutral-500 uppercase dark:text-neutral-400">
        GitHub
      </h2>

      <div
        ref={gridRef}
        role="img"
        aria-label={caption}
        className="mt-6 grid"
        style={{
          gridAutoFlow: 'column',
          gridTemplateRows: 'repeat(7, 1fr)',
          gridTemplateColumns: `repeat(${visible.length}, 1fr)`,
        }}
      >
        {visible.flatMap((week, w) =>
          week.map((d, i) => (
            <span
              key={`${w}-${i}`}
              aria-hidden="true"
              title={
                d?.date
                  ? `${d.count} contribution${d.count === 1 ? '' : 's'} on ${d.date}`
                  : undefined
              }
              className="flex aspect-square items-center justify-center"
            >
              {d && (
                <span
                  className={`rounded-full ${
                    d.level === 0
                      ? 'bg-black/20 dark:bg-white/20'
                      : 'bg-neutral-900 dark:bg-white'
                  } ${status === 'loading' ? 'animate-pulse' : ''}`}
                  style={{ width: DOT[d.level], height: DOT[d.level] }}
                />
              )}
            </span>
          )),
        )}
      </div>

      <p className="mt-5 text-neutral-500 dark:text-neutral-400">{caption}</p>
    </section>
  );
}
