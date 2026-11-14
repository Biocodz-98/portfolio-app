import { useState } from 'react';

// App icon. Falls back to the project's first letter if the file is missing.
export function ProjectIcon({ project, className = '' }) {
  const [failed, setFailed] = useState(false);

  return (
    <span
      className={`flex shrink-0 items-center justify-center overflow-hidden bg-stone-100 text-neutral-900 ${className}`}
    >
      {project.icon && !failed ? (
        <img
          src={project.icon}
          alt=""
          draggable={false}
          onError={() => setFailed(true)}
          className="size-full object-cover"
        />
      ) : (
        <span className="text-2xl font-bold">
          {project.name[0].toUpperCase()}
        </span>
      )}
    </span>
  );
}

// Screenshots and banners. Shows a plain dark tile if the file is missing.
export function ProjectImage({ src, alt = '', className = '' }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className={`bg-neutral-200 dark:bg-neutral-800 ${className}`} />
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      draggable={false}
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
