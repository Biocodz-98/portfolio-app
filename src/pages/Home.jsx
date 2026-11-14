import { useRef, useState } from 'react';
import LeftColumn from '../ui/data/LeftColumn';
import ProjectsColumn from '../projects/ProjectsColumn';
import RightColumn from '../tools/RightColumn';

const COLUMNS = [
  { label: 'Profile', Component: LeftColumn },
  { label: 'Projects', Component: ProjectsColumn },
  { label: 'Stack', Component: RightColumn },
];

// xl and up: three columns side by side, each with its own scroll.
// Below xl: the same three columns, each one screen wide, swiped sideways
// (each still scrolls up and down on its own).
export default function Home() {
  const rail = useRef(null);
  const [active, setActive] = useState(0);

  const onScroll = () => {
    const el = rail.current;
    if (el) setActive(Math.round(el.scrollLeft / el.clientWidth));
  };

  const goTo = (i) =>
    rail.current?.scrollTo({
      left: i * rail.current.clientWidth,
      behavior: 'smooth',
    });

  return (
    <>
      <main
        ref={rail}
        onScroll={onScroll}
        className="flex h-dvh snap-x snap-mandatory overflow-x-auto overflow-y-hidden [scrollbar-width:none] xl:grid xl:snap-none xl:grid-cols-[minmax(360px,28fr)_minmax(0,44fr)_minmax(340px,28fr)] xl:overflow-x-hidden [&::-webkit-scrollbar]:hidden"
      >
        {COLUMNS.map(({ label, Component }) => (
          <div
            key={label}
            className="h-full w-full shrink-0 snap-center snap-always overflow-x-hidden overflow-y-auto overscroll-contain [scrollbar-color:rgb(115_115_115/0.4)_transparent] [scrollbar-width:thin] xl:w-auto xl:border-l xl:border-black/10 xl:first:border-l-0 dark:xl:border-white/10"
          >
            <div className="mx-auto w-full max-w-[640px] xl:max-w-none">
              <Component />
            </div>
          </div>
        ))}
      </main>

      {/* mobile / tablet: which column you're on */}
      <nav
        aria-label="Columns"
        className="fixed bottom-7 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/60 px-3 py-2.5 backdrop-blur xl:hidden"
      >
        {COLUMNS.map(({ label }, i) => (
          <button
            key={label}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Show ${label}`}
            aria-current={i === active}
            className={`h-1.5 rounded-full bg-white transition-all duration-300 ${
              i === active ? 'w-6' : 'w-1.5 opacity-50'
            }`}
          />
        ))}
      </nav>
    </>
  );
}
