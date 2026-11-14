// The little "cursor + bubble" popover from the design.
//
// <Hint text="Grab my CV 📄">…button…</Hint>   -> shows on hover / keyboard focus
// <Bubble /> is the bare visual, for places that control their own hover (the hero).

function Cursor({ className = '' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`size-5 text-neutral-900 drop-shadow-md dark:text-white ${className}`}
    >
      <path
        d="M4 3l16 7.5-6.8 2.2L10.5 20z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Bubble({ label = 'You', text, flip = false, className = '' }) {
  return (
    <span
      role="tooltip"
      className={`pointer-events-none absolute z-30 translate-y-1 opacity-0 transition duration-200 ease-out motion-reduce:transition-none ${className}`}
    >
      <span className="relative block">
        <Cursor
          className={`absolute -top-1 ${flip ? 'right-0 -scale-x-100' : 'left-0'}`}
        />
        {text ? (
          <span
            className={`mt-3 block w-max max-w-56 rounded-2xl bg-neutral-900 px-3.5 py-2.5 text-left text-stone-100 shadow-lg dark:bg-neutral-800 ${
              flip ? 'mr-4' : 'ml-4'
            }`}
          >
            <span className="block text-xs text-neutral-400">{label}</span>
            <span className="block text-sm font-medium">{text}</span>
          </span>
        ) : (
          <span
            className={`mt-3 block w-max rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-medium text-neutral-900 shadow-lg ${
              flip ? 'mr-4' : 'ml-4'
            }`}
          >
            {label}
          </span>
        )}
      </span>
    </span>
  );
}

export default function Hint({
  text,
  label,
  align = 'center',
  className = '',
  children,
}) {
  const position =
    align === 'end'
      ? 'left-1/2 top-[65%] -translate-x-full'
      : 'left-1/2 top-[65%]';

  return (
    <span className={`group/hint relative ${className}`}>
      {children}
      <Bubble
        label={label}
        text={text}
        flip={align === 'end'}
        className={`${position} group-hover/hint:translate-y-0 group-hover/hint:opacity-100 group-focus-within/hint:translate-y-0 group-focus-within/hint:opacity-100`}
      />
    </span>
  );
}
