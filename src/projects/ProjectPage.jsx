import { useEffect, useRef, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Share,
  Smartphone,
  User,
} from 'lucide-react';
import { ProjectIcon, ProjectImage } from './ProjectMedia';
import { getProject } from './Project';
import { profile } from '../ui/data/Profile';
import { shareLink } from './share';

function Section({ title, children }) {
  return (
    <section className="border-t border-black/10 py-8 dark:border-white/10">
      {title && (
        <h2 className="mb-5 text-3xl font-bold tracking-tight">{title}</h2>
      )}
      {children}
    </section>
  );
}

function PreviewRail({ shots, name }) {
  const ref = useRef(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const update = () => {
    const el = ref.current;
    if (!el) return;
    setEdge({
      start: el.scrollLeft <= 4,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
    });
  };

  useEffect(() => {
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const scroll = (dir) =>
    ref.current?.scrollBy({
      left: dir * ref.current.clientWidth * 0.8,
      behavior: 'smooth',
    });

  const btn =
    'absolute top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-stone-100 text-neutral-900 shadow-lg transition-transform hover:scale-105';

  return (
    <div className="relative">
      <div
        ref={ref}
        onScroll={update}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {shots.map((src, i) => (
          <div
            key={src}
            className="aspect-[9/19] w-[min(72vw,292px)] shrink-0 snap-start overflow-hidden rounded-[1.75rem] border border-black/10 bg-white lg:w-[calc((100%-3rem)/4)] dark:border-white/10"
          >
            <ProjectImage
              src={src}
              alt={`${name} screen ${i + 1}`}
              className="size-full object-cover object-top"
            />
          </div>
        ))}
      </div>

      {!edge.start && (
        <button
          type="button"
          onClick={() => scroll(-1)}
          aria-label="Previous screens"
          className={`${btn} left-2`}
        >
          <ChevronLeft className="size-6" />
        </button>
      )}
      {!edge.end && (
        <button
          type="button"
          onClick={() => scroll(1)}
          aria-label="Next screens"
          className={`${btn} right-2`}
        >
          <ChevronRight className="size-6" />
        </button>
      )}
    </div>
  );
}

export default function ProjectPage() {
  const { slug } = useParams();
  const project = getProject(slug);
  const [toast, setToast] = useState('');
  const toastTimer = useRef();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  if (!project) return <Navigate to="/" replace />;

  const developer = profile.name;
  const live = Boolean(project.liveUrl);

  const roles = Array.isArray(project.role)
    ? project.role
    : project.role
      ? [project.role]
      : [];

  const share = async () => {
    const result = await shareLink({
      title: `${project.name} – ${developer}`,
      text: project.tagline,
    });
    const msg = { copied: 'Link copied', error: "Couldn't share this one" }[
      result
    ];
    if (msg) {
      setToast(msg);
      clearTimeout(toastTimer.current);
      toastTimer.current = setTimeout(() => setToast(''), 2200);
    }
  };

  const cells = [
    project.category && {
      label: 'Category',
      icon: LayoutGrid,
      value: project.category,
    },
    project.platform && {
      label: 'Platform',
      icon: Smartphone,
      value: project.platform,
    },
    project.year && { label: 'Year', big: project.year, value: 'Built' },
    { label: 'Developer', icon: User, value: developer.split(' ')[0] },
    ...project.stats.map((s) => ({
      label: 'Stat',
      big: s.value,
      value: s.label,
    })),
  ].filter(Boolean);

  const info = [
    { label: 'Developer', value: developer },
    project.category && { label: 'Category', value: project.category },
    project.platform && { label: 'Platform', value: project.platform },
    project.timeline && { label: 'Timeline', value: project.timeline },
    roles.length > 0 && { label: 'Role', value: roles.join(', ') },
  ].filter(Boolean);

  return (
    <div className="min-h-screen text-neutral-900 dark:text-stone-100">
      <header className="sticky top-0 z-20 border-b border-black/10 bg-stone-50/80 backdrop-blur dark:border-white/10 dark:bg-neutral-950/80">
        <div className="mx-auto max-w-6xl px-6 py-5">
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-lg font-semibold"
          >
            <ChevronLeft className="size-5" />
            Projects
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-24">
        {/* title block */}
        <div className="flex flex-col gap-6 pt-10 sm:flex-row sm:gap-8">
          <ProjectIcon
            project={project}
            className="size-28 rounded-[1.75rem] sm:size-52 sm:rounded-[2.75rem]"
          />

          <div className="min-w-0">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              {project.name}
            </h1>
            <p className="mt-3 text-xl text-neutral-600 sm:text-2xl dark:text-neutral-300">
              {project.tagline}
            </p>
            <p className="mt-3 text-neutral-500 dark:text-neutral-400">
              {developer}
            </p>

            <div className="mt-8 flex items-center gap-4">
              {live ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-neutral-900 px-8 py-3 font-semibold tracking-wide text-stone-50 uppercase transition-opacity hover:opacity-90 dark:bg-stone-100 dark:text-neutral-900"
                >
                  Open
                </a>
              ) : (
                <span className="rounded-full bg-black/5 px-8 py-3 font-semibold tracking-wide text-neutral-500 uppercase dark:bg-white/10 dark:text-neutral-300">
                  Soon
                </span>
              )}

              <button
                type="button"
                onClick={share}
                aria-label="Share this project"
                className="flex size-11 items-center justify-center rounded-full transition-colors hover:bg-black/5 dark:hover:bg-white/10"
              >
                <Share className="size-6" />
              </button>
              <span
                aria-live="polite"
                className="text-sm text-neutral-500 dark:text-neutral-400"
              >
                {toast}
              </span>
            </div>
          </div>
        </div>

        {/* info strip */}
        <dl className="my-10 grid grid-cols-2 gap-y-2 border-y border-black/10 sm:grid-cols-4 lg:auto-cols-fr lg:grid-flow-col dark:border-white/10">
          {cells.map(({ label, icon: Icon, big, value }, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-2 px-3 py-5 text-center lg:border-l lg:border-black/10 lg:first:border-l-0 dark:lg:border-white/10"
            >
              <dt className="text-xs font-medium tracking-wider uppercase">
                {label}
              </dt>
              <dd className="flex flex-col items-center gap-2">
                {Icon ? (
                  <Icon className="size-6" />
                ) : (
                  <span className="text-2xl font-bold tabular-nums">{big}</span>
                )}
                <span className="text-sm leading-snug text-neutral-500 dark:text-neutral-400">
                  {value}
                </span>
              </dd>
            </div>
          ))}
        </dl>

        {project.screenshots.length > 0 && (
          <section className="pb-10">
            <h2 className="mb-5 text-3xl font-bold tracking-tight">Preview</h2>
            <PreviewRail shots={project.screenshots} name={project.name} />
          </section>
        )}

        <Section>
          <p className="text-lg leading-relaxed">{project.description}</p>
        </Section>

        {roles.length > 0 && (
          <Section title="My Role">
            <ul
              className="grid gap-x-12 gap-y-3 md:grid-flow-col"
              style={{
                gridTemplateRows: `repeat(${Math.ceil(roles.length / 2)}, auto)`,
              }}
            >
              {roles.map((item) => (
                <li key={item} className="flex items-start gap-3 text-lg">
                  <Check className="mt-1 size-5 shrink-0 text-neutral-500 dark:text-neutral-400" />
                  {item}
                </li>
              ))}
            </ul>
          </Section>
        )}
        {project.problem && (
          <Section title="The Problem">
            <p className="text-lg leading-relaxed">{project.problem}</p>
          </Section>
        )}

        {project.solution && (
          <Section title="The Solution">
            <p className="text-lg leading-relaxed">{project.solution}</p>
          </Section>
        )}

        <Section title="Information">
          <dl>
            {info.map(({ label, value }) => (
              <div
                key={label}
                className="flex justify-between gap-8 border-b border-black/10 py-4 last:border-b-0 dark:border-white/10"
              >
                <dt className="text-neutral-500 dark:text-neutral-400">
                  {label}
                </dt>
                <dd className="text-right font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        </Section>
      </main>
    </div>
  );
}
