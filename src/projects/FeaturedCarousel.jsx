import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { ProjectIcon, ProjectImage } from './ProjectMedia';

const SWIPE_PX = 50;

function Slide({ project, position, total, active }) {
  return (
    <article
      aria-roledescription="slide"
      aria-label={`${position} of ${total}`}
      aria-hidden={!active}
      className="flex w-full shrink-0 flex-col @xl:min-h-[350px] @xl:flex-row"
    >
      <div className="relative h-64 shrink-0 bg-neutral-100 @xl:h-auto @xl:w-[47%] dark:bg-neutral-900">
        <ProjectImage
          src={project.banner}
          alt={`${project.name} preview`}
          className="absolute inset-0 size-full object-cover object-top"
        />
      </div>

      <div className="flex flex-1 flex-col p-6 @xl:p-7">
        <div className="flex items-center gap-4">
          <ProjectIcon project={project} className="size-14 rounded-xl" />
          <div className="min-w-0">
            <h3 className="truncate text-2xl font-bold tracking-tight">
              {project.name}
            </h3>
            <p className="truncate text-sm text-neutral-500 dark:text-neutral-400">
              {project.tags.join(' · ')}
            </p>
          </div>
        </div>

        <p className="mt-6 text-xl leading-relaxed text-neutral-600 dark:text-neutral-400">
          {project.tagline}
        </p>

        {project.stats.length > 0 && (
          <dl className="mt-6 grid grid-cols-3 gap-4">
            {project.stats.map((s) => (
              <div key={s.label} className="min-w-0">
                <dd className="text-3xl font-bold tabular-nums">{s.value}</dd>
                <dt className="mt-1 line-clamp-2 text-sm leading-snug text-neutral-500 dark:text-neutral-400">
                  {s.label}
                </dt>
              </div>
            ))}
          </dl>
        )}

        <Link
          to={`/projects/${project.slug}`}
          tabIndex={active ? 0 : -1}
          className="mt-auto inline-flex items-center gap-2 pt-6 text-lg font-semibold hover:underline"
        >
          Read case study
          <ArrowRight className="size-5" />
        </Link>
      </div>
    </article>
  );
}

export default function FeaturedCarousel({ projects }) {
  const [index, setIndex] = useState(0);
  const dragStart = useRef(null);
  const total = projects.length;

  if (total === 0) return null;

  const go = (n) => setIndex((n + total) % total); // wraps around

  const onPointerDown = (e) => {
    dragStart.current = e.clientX;
  };
  const onPointerUp = (e) => {
    if (dragStart.current === null) return;
    const dx = e.clientX - dragStart.current;
    dragStart.current = null;
    if (Math.abs(dx) > SWIPE_PX) go(index + (dx < 0 ? 1 : -1));
  };

  const arrow =
    'flex size-9 items-center justify-center rounded-full border border-black/15 transition-colors hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10';

  return (
    <section aria-roledescription="carousel" aria-label="Featured projects">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium tracking-widest text-neutral-500 uppercase dark:text-neutral-400">
          Featured{' '}
          <span className="ml-2 text-neutral-900 tabular-nums dark:text-stone-100">
            {index + 1}/{total}
          </span>
        </h2>

        {total > 1 && (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Previous project"
              className={arrow}
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Next project"
              className={arrow}
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        )}
      </div>

      <div
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (dragStart.current = null)}
        className="@container mt-5 touch-pan-y overflow-hidden rounded-3xl border border-black/10 dark:border-white/10"
      >
        <div
          className="flex transition-transform duration-500 ease-out motion-reduce:transition-none"
          style={{ transform: `translateX(-${index * 100}%)` }}
          aria-live="polite"
        >
          {projects.map((p, i) => (
            <Slide
              key={p.slug}
              project={p}
              position={i + 1}
              total={total}
              active={i === index}
            />
          ))}
        </div>
      </div>

      {total > 1 && (
        <div className="mt-4 flex justify-center gap-1.5">
          {projects.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              onClick={() => go(i)}
              aria-label={`Show ${p.name}`}
              aria-current={i === index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index
                  ? 'w-6 bg-neutral-900 dark:bg-stone-100'
                  : 'w-1.5 bg-black/20 hover:bg-black/40 dark:bg-white/25 dark:hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
