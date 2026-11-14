import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Check, ChevronDown } from 'lucide-react';
import { Bubble } from '../ui/data/Hint';
import { ProjectIcon } from './ProjectMedia';
import { hostOf } from './Project';

function FilterMenu({ options, value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => !ref.current?.contains(e.target) && setOpen(false);
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="inline-flex h-10 items-center gap-2 rounded-full border border-black/15 px-4 text-sm font-semibold transition-colors hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
      >
        {value}
        <ChevronDown
          className={`size-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-20 mt-2 max-h-72 w-48 overflow-y-auto rounded-2xl border border-black/10 bg-white p-1.5 shadow-xl dark:border-white/10 dark:bg-neutral-900"
        >
          {options.map((opt) => (
            <li key={opt} role="option" aria-selected={opt === value}>
              <button
                type="button"
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition-colors hover:bg-black/5 dark:hover:bg-white/10"
              >
                {opt}
                {opt === value && <Check className="size-4" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Row({ project }) {
  const live = Boolean(project.liveUrl);

  const className =
    'group/item relative -mx-4 flex gap-4 rounded-2xl p-4 transition-colors hover:bg-black/[0.03] focus-visible:bg-black/[0.03] dark:hover:bg-white/[0.04] dark:focus-visible:bg-white/[0.04]';

  const inner = (
    <>
      <ProjectIcon project={project} className="size-14 rounded-2xl" />

      <div className="min-w-0 flex-1">
        <h3 className="flex items-center gap-1.5 text-lg font-semibold">
          {project.name}
          {live && <ArrowUpRight className="size-4 text-neutral-400" />}
        </h3>

        <ul className="mt-2 flex flex-wrap gap-2">
          {(project.tags ?? []).map((t) => (
            <li
              key={t}
              className="rounded-full border border-black/10 px-3 py-1 text-xs text-neutral-600 dark:border-white/15 dark:text-neutral-300"
            >
              {t}
            </li>
          ))}
        </ul>

        <p className="mt-3 leading-relaxed text-neutral-600 dark:text-neutral-400">
          {project.description}
        </p>
      </div>

      <Bubble
        text={
          live
            ? `Visit ${hostOf(project.liveUrl)}`
            : 'Not live yet. Open case study'
        }
        flip
        className="top-6 right-6 group-hover/item:translate-y-0 group-hover/item:opacity-100 group-focus-visible/item:translate-y-0 group-focus-visible/item:opacity-100"
      />
    </>
  );

  return live ? (
    <a
      href={project.liveUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {inner}
    </a>
  ) : (
    <Link to={`/projects/${project.slug}`} className={className}>
      {inner}
    </Link>
  );
}

export default function ProjectList({ projects }) {
  const [filter, setFilter] = useState('All');

  const options = useMemo(
    () => ['All', ...new Set(projects.flatMap((p) => p.tags ?? []))],
    [projects],
  );
  const shown =
    filter === 'All'
      ? projects
      : projects.filter((p) => p.tags?.includes(filter));

  return (
    <section>
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium tracking-widest text-neutral-500 uppercase dark:text-neutral-400">
          Projects{' '}
          <span className="ml-2 text-neutral-900 tabular-nums dark:text-stone-100">
            {shown.length}
          </span>
        </h2>
        <FilterMenu options={options} value={filter} onChange={setFilter} />
      </div>

      <ul className="mt-5 space-y-2">
        {shown.map((p) => (
          <li key={p.slug}>
            <Row project={p} />
          </li>
        ))}
      </ul>
    </section>
  );
}
