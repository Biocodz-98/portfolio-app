import { ArrowRight, ArrowUpRight, Medal, Trophy } from 'lucide-react';

const ICONS = { trophy: Trophy, medal: Medal };

export default function Achievements({ items = [] }) {
  if (!items.length) return null;
  return (
    <section>
      <h2 className="text-sm font-medium tracking-widest text-neutral-500 uppercase dark:text-neutral-400">
        Achievements
      </h2>

      <ul className="mt-6 space-y-8">
        {items.map((a, i) => {
          const Icon = ICONS[a.icon] ?? Trophy;
          return (
            <li key={i} className="flex gap-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-black/10 bg-black/[0.03] dark:border-white/10 dark:bg-white/[0.05]">
                <Icon className="size-5" />
              </span>

              <div className="min-w-0">
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  {a.source} · {a.date}
                </p>
                <h3 className="mt-1 text-xl leading-snug font-semibold">
                  {a.title}
                </h3>
                <p className="mt-2 leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {a.description}
                </p>

                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                  {a.links?.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      {...(link.external && {
                        target: '_blank',
                        rel: 'noopener noreferrer',
                      })}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold hover:underline"
                    >
                      {link.label}
                      {link.external ? (
                        <ArrowUpRight className="size-4" />
                      ) : (
                        <ArrowRight className="size-4" />
                      )}
                    </a>
                  ))}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
