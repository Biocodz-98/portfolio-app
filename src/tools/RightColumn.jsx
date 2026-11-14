import GithubGrid from './GithubGrid';
import Tools from './Tools';
import { toolGroups } from './Tool';

export default function RightColumn() {
  return (
    <section className="relative isolate w-full text-neutral-900 dark:text-stone-100">
      {/* faint dot grid, same as the other columns */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[460px] bg-[radial-gradient(circle,rgb(0_0_0/0.12)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent)] dark:bg-[radial-gradient(circle,rgb(255_255_255/0.1)_1px,transparent_1px)]"
      />

      <div className="space-y-12 px-6 pt-14 pb-24">
        <GithubGrid />
        <Tools groups={toolGroups} />
      </div>
    </section>
  );
}
