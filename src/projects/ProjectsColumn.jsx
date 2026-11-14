import FeaturedCarousel from './FeaturedCarousel';
import ProjectList from './ProjectList';
import { projects } from './Project';

export default function ProjectsColumn() {
  return (
    <section className="relative isolate w-full text-neutral-900 dark:text-stone-100">
      {/* faint dot grid, same as the left column */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[460px] bg-[radial-gradient(circle,rgb(0_0_0/0.12)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent)] dark:bg-[radial-gradient(circle,rgb(255_255_255/0.1)_1px,transparent_1px)]"
      />

      <div className="space-y-14 px-6 pt-14 pb-24">
        <FeaturedCarousel projects={projects.filter((p) => p.featured)} />
        <ProjectList projects={projects} />
      </div>
    </section>
  );
}
