import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';

const VISIBLE = 2; 

function Item({ item, isLast }) {
  return (
    <li className={`relative pl-8 ${isLast ? '' : 'pb-7'}`}>
      <span className="absolute left-0 top-[7px] size-2 rounded-full bg-neutral-900 dark:bg-white" />
      {!isLast && (
        <span className="absolute bottom-0 left-[3.5px] top-[17px] w-px bg-black/10 dark:bg-white/15" />
      )}

      <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
        <span>{item.period}</span>
        {item.current && (
          <span className="rounded-full border border-black/10 px-2 py-0.5 text-xs dark:border-white/15">
            Now
          </span>
        )}
      </div>

      <p className="mt-1.5 text-lg leading-snug">
        <span className="font-medium">{item.company}</span>{' '}
        <em className="text-neutral-500 dark:text-neutral-400">{item.role}</em>
      </p>
    </li>
  );
}

export default function Experience({ items }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  const total = items.length;
  const shown = items.slice(0, VISIBLE);
  const hidden = items.slice(VISIBLE);

  return (
    <section>
      <h2 className="text-sm font-medium tracking-widest text-neutral-500 uppercase dark:text-neutral-400">
        Experience
      </h2>

      <div className="mt-6">
        <ol>
          {shown.map((item, i) => (
            <Item
              key={i}
              item={item}
              isLast={hidden.length === 0 && i === shown.length - 1}
            />
          ))}
        </ol>

        {hidden.length > 0 && (
          <>
            <div
              id={panelId}
              className={`grid transition-[grid-template-rows,visibility] duration-300 ease-out motion-reduce:transition-none ${
                open ? 'visible grid-rows-[1fr]' : 'invisible grid-rows-[0fr]'
              }`}
            >
              <div className="overflow-hidden">
                <ol>
                  {hidden.map((item, i) => (
                    <Item
                      key={i}
                      item={item}
                      isLast={i === hidden.length - 1}
                    />
                  ))}
                </ol>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls={panelId}
              className="mt-5 ml-8 inline-flex items-center gap-1.5 text-sm font-medium tracking-wide text-neutral-600 uppercase transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
            >
              {open ? 'Show less' : 'Show more'} ({total})
              <ChevronDown
                className={`size-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
              />
            </button>
          </>
        )}
      </div>
    </section>
  );
}
