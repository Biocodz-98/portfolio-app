import { useState } from 'react';

function ToolIcon({ tool }) {
  const [attempt, setAttempt] = useState(0);
  const slug = tool.icons?.[attempt];

  if (!slug) {
    return (
      <span className="flex size-5 items-center justify-center rounded bg-black/10 text-[10px] font-bold dark:bg-white/15">
        {tool.name[0]}
      </span>
    );
  }

  // Black glyph, inverted to white in dark mode.
  return (
    <img
      src={`https://cdn.simpleicons.org/${slug}/000000`}
      alt=""
      width={20}
      height={20}
      loading="lazy"
      draggable={false}
      onError={() => setAttempt((a) => a + 1)}
      className="size-5 object-contain dark:invert"
    />
  );
}

export default function Tools({ groups }) {
  const total = groups.reduce((n, g) => n + g.items.length, 0);

  return (
    <section>
      <h2 className="text-sm font-medium tracking-widest text-neutral-500 uppercase dark:text-neutral-400">
        Tools &amp; Technologies{' '}
        <span className="ml-2 text-neutral-900 tabular-nums dark:text-stone-100">
          {total}
        </span>
      </h2>

      <div className="mt-6 space-y-6">
        {groups.map((group) => (
          <div key={group.name}>
            <div className="flex items-center gap-3 text-sm text-neutral-500 dark:text-neutral-400">
              <h3>{group.name}</h3>
              <span
                aria-hidden="true"
                className="h-px flex-1 bg-black/10 dark:bg-white/10"
              />
              <span className="tabular-nums">{group.items.length}</span>
            </div>

            <ul className="mt-3 flex flex-wrap gap-2.5">
              {group.items.map((tool) => (
                <li
                  key={tool.name}
                  className="inline-flex items-center gap-2 rounded-full border border-black/10 px-3.5 py-2 text-sm dark:border-white/15"
                >
                  <ToolIcon tool={tool} />
                  {tool.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
