import { useState } from 'react';
import { BadgeCheck, Layers, Mail, User, Zap } from 'lucide-react';
import Hint, { Bubble } from './Hint';
import Experience from './Experience';
import Achievements from './Achievement';
import AvailabilityCard from './AvailabilityCard';
import StoryViewer from './StoryViewer';
import { profile, whatsappUrl } from './Profile';

const HIGHLIGHT_ICONS = { user: User, layers: Layers, zap: Zap, mail: Mail };

const RING_GRADIENT =
  'conic-gradient(from 0deg, transparent 0deg, currentColor 70deg, transparent 95deg, transparent 180deg, currentColor 250deg, transparent 275deg)';
const RING_MASK =
  'radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 3px))';

function Hero() {
  return (
    // Hovering anywhere on the hero spins the ring and shows the "You" popover.
    <div className="group/hero flex flex-col items-center text-center">
      <div className="relative size-[220px]">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -inset-[5px] animate-spin rounded-full text-neutral-900 opacity-0 transition-opacity duration-300 [animation-duration:3s] [animation-play-state:paused] group-hover/hero:opacity-100 group-hover/hero:[animation-play-state:running] motion-reduce:animate-none dark:text-white"
          style={{
            background: RING_GRADIENT,
            WebkitMask: RING_MASK,
            mask: RING_MASK,
          }}
        />

        <div className="relative size-full overflow-hidden rounded-full bg-neutral-200 ring-1 ring-black/10 dark:bg-neutral-900 dark:ring-white/10">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="size-full object-cover"
            draggable={false}
          />
        </div>

        <Bubble className="top-[16%] left-[92%] group-hover/hero:translate-y-0 group-hover/hero:opacity-100" />
      </div>

      <h1 className="mt-8 flex items-center gap-2 text-3xl font-bold tracking-tight">
        {profile.name}
        {profile.verified && (
          <BadgeCheck className="size-6 fill-neutral-900 text-stone-50 dark:fill-white dark:text-neutral-950" />
        )}
      </h1>
      <p className="mt-1 text-lg text-neutral-500 dark:text-neutral-400">
        {profile.title}
      </p>
      <p className="mt-6 text-lg text-neutral-500 dark:text-neutral-400">
        {profile.tagline}
      </p>
    </div>
  );
}

function ActionButtons() {
  return (
    <div className="flex gap-3">
      <Hint text="Follow me on GitHub" className="flex-1">
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 w-full items-center justify-center rounded-2xl bg-neutral-900 font-semibold text-stone-50 transition-opacity hover:opacity-90 dark:bg-stone-100 dark:text-neutral-900"
        >
          Follow
        </a>
      </Hint>

      <Hint text="Message me on WhatsApp" className="flex-1">
        <a
          href={whatsappUrl(profile.whatsapp)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 w-full items-center justify-center rounded-2xl border border-black/15 font-semibold transition-colors hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
        >
          Message
        </a>
      </Hint>
    </div>
  );
}

function Highlights({ items, onSelect }) {
  return (
    <ul className="flex gap-4 sm:gap-5">
      {items.map(({ key, label, icon, image }, i) => {
        const Icon = HIGHLIGHT_ICONS[icon] ?? User;
        return (
          <li key={key}>
            <button
              type="button"
              onClick={() => onSelect(i)}
              className="group flex w-16 flex-col items-center gap-2 sm:w-20"
            >
              <span className="flex size-16 items-center justify-center overflow-hidden rounded-full sm:size-20 border border-black/15 bg-black/[0.04] transition-transform group-hover:scale-105 dark:border-white/15 dark:bg-white/[0.06]">
                {image ? (
                  <img src={image} alt="" className="size-full object-cover" />
                ) : (
                  <Icon className="size-7 text-neutral-600 dark:text-neutral-300" />
                )}
              </span>
              <span className="text-sm text-neutral-500 dark:text-neutral-400">
                {label}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default function LeftColumn() {
  const [storyIndex, setStoryIndex] = useState(null);

  return (
    <section className="relative isolate w-full text-neutral-900 dark:text-stone-100">
      {/* faint dot grid fading out down the page */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[460px] bg-[radial-gradient(circle,rgb(0_0_0/0.12)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent)] dark:bg-[radial-gradient(circle,rgb(255_255_255/0.1)_1px,transparent_1px)]"
      />

      <div className="space-y-12 px-5 pt-16 pb-24 sm:px-10 sm:pt-20">
        <div className="space-y-10">
          <Hero />
          <ActionButtons />
          <Highlights items={profile.highlights} onSelect={setStoryIndex} />
        </div>

        <Experience items={profile.experience} />
        <Achievements items={profile.achievements} />
        <AvailabilityCard
          availability={profile.availability}
          cv={profile.cv}
          whatsapp={profile.whatsapp}
        />
      </div>

      {storyIndex !== null && (
        <StoryViewer
          stories={profile.highlights}
          startIndex={storyIndex}
          onClose={() => setStoryIndex(null)}
        />
      )}
    </section>
  );
}
