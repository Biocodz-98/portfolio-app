import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Pause,
  Play,
  Send,
  X,
} from 'lucide-react';
import { profile, whatsappUrl } from './Profile';

const DURATION = 5000; // ms each story stays before moving to the next

function SlideContent({ story }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-28 z-20 px-7">
      <h2 className="text-3xl leading-tight font-bold text-balance">
        {story.title}
      </h2>

      {story.body && (
        <p className="mt-3 text-lg leading-relaxed text-white/80">
          {story.body}
        </p>
      )}

      {story.chips && (
        <ul className="mt-5 flex flex-wrap gap-2">
          {story.chips.map((chip) => (
            <li
              key={chip}
              className="rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-sm backdrop-blur"
            >
              {chip}
            </li>
          ))}
        </ul>
      )}

      {story.items && (
        <ul className="mt-5 space-y-2.5 text-lg text-white/85">
          {story.items.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-white" />
              {item}
            </li>
          ))}
        </ul>
      )}

      {story.cta === 'whatsapp' && (
        <a
          href={whatsappUrl(profile.whatsapp)}
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 font-semibold text-neutral-900 transition-colors hover:bg-stone-200"
        >
          <MessageCircle className="size-5" />
          Message me on WhatsApp
        </a>
      )}
    </div>
  );
}

export default function StoryViewer({ stories, startIndex = 0, onClose }) {
  const [index, setIndex] = useState(startIndex);
  const [cycle, setCycle] = useState(0); // bumped to restart the bar on the first story
  const [manualPause, setManualPause] = useState(false);
  const [typing, setTyping] = useState(false);
  const [text, setText] = useState('');
  const [toast, setToast] = useState('');
  const dialogRef = useRef(null);
  const toastTimer = useRef();

  const total = stories.length;
  const story = stories[index];
  const paused = manualPause || typing;

  const next = useCallback(() => {
    if (index >= total - 1)
      onClose(); // finished the last story
    else setIndex(index + 1);
  }, [index, total, onClose]);

  const prev = useCallback(() => {
    if (index === 0) setCycle((c) => c + 1);
    else setIndex(index - 1);
  }, [index]);

  // keyboard: Esc closes, arrows move, space pauses
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') return onClose();
      const tag = e.target instanceof HTMLElement ? e.target.tagName : '';
      if (tag === 'INPUT') return;
      if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === ' ' && tag !== 'BUTTON' && tag !== 'A') {
        e.preventDefault();
        setManualPause((p) => !p);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev, onClose]);

  // lock page scroll, move focus in, give it back on close
  useEffect(() => {
    const opener = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      opener instanceof HTMLElement && opener.focus();
      clearTimeout(toastTimer.current);
    };
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(''), 2200);
  };

  // "Send message…" -> opens WhatsApp with what was typed
  const sendToWhatsApp = (e) => {
    e.preventDefault();
    const message = text.trim();
    if (!message) return;
    window.open(
      whatsappUrl({ number: profile.whatsapp.number, message }),
      '_blank',
      'noopener,noreferrer',
    );
    setText('');
  };

  // paper plane -> share sheet (any app). Falls back to copying the link.
  const forward = async () => {
    const data = {
      title: `${profile.name} – Portfolio`,
      text: `Take a look at ${profile.name}'s portfolio`,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(data);
      } else {
        await navigator.clipboard.writeText(data.url);
        showToast('Link copied');
      }
    } catch (err) {
      if (err?.name !== 'AbortError') showToast("Couldn't share this one");
    }
  };

  const roundBtn =
    'flex size-12 items-center justify-center rounded-full bg-stone-100 text-neutral-900 shadow-lg transition-transform hover:scale-105';

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${profile.name} stories`}
      tabIndex={-1}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="story-modal fixed inset-0 z-[60] flex items-center justify-center bg-black/85 text-white outline-none backdrop-blur-md"
    >
      <style>{`
        @keyframes story-progress { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @keyframes story-in { from { opacity: 0; transform: scale(.97); } to { opacity: 1; transform: none; } }
        .story-bar { animation-name: story-progress; animation-timing-function: linear; animation-fill-mode: forwards; }
        .story-modal { animation: story-in 200ms ease-out; }
        @media (prefers-reduced-motion: reduce) { .story-modal { animation: none; } }
      `}</style>

      <button
        type="button"
        onClick={onClose}
        aria-label="Close stories"
        className="absolute top-5 right-5 flex size-10 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white"
      >
        <X className="size-7" />
      </button>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous story"
          className={`${roundBtn} hidden sm:flex ${index === 0 ? 'invisible' : ''}`}
        >
          <ChevronLeft className="size-6" />
        </button>

        <div className="relative aspect-[9/16] h-[min(88dvh,800px)] max-w-[calc(100vw-1rem)] overflow-hidden rounded-[2rem] bg-neutral-900">
          {/* background */}
          {story.image ? (
            <img
              src={story.image}
              alt=""
              draggable={false}
              className="absolute inset-0 size-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-linear-to-br from-neutral-700 via-neutral-900 to-black" />
          )}
          <div className="absolute inset-0 bg-linear-to-b from-black/55 via-black/10 to-black/75" />

          {/* tap zones: left = back, right = forward */}
          <button
            type="button"
            onClick={prev}
            aria-label="Previous story"
            className="absolute inset-y-0 left-0 z-10 w-1/3 cursor-w-resize"
          />
          <button
            type="button"
            onClick={next}
            aria-label="Next story"
            className="absolute inset-y-0 right-0 z-10 w-2/3 cursor-e-resize"
          />

          <SlideContent key={story.key} story={story} />

          {/* top: progress bars + header */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-30 px-3 pt-3">
            <div className="flex gap-1.5">
              {stories.map((s, i) => (
                <span
                  key={s.key}
                  className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/30"
                >
                  {i < index && <span className="block size-full bg-white" />}
                  {i === index && (
                    <span
                      key={`${index}-${cycle}`}
                      onAnimationEnd={next}
                      className="story-bar block size-full origin-left bg-white"
                      style={{
                        animationDuration: `${DURATION}ms`,
                        animationPlayState: paused ? 'paused' : 'running',
                      }}
                    />
                  )}
                </span>
              ))}
            </div>

            <div className="mt-3 flex items-center gap-3">
              <img
                src={profile.avatar}
                alt=""
                className="size-10 rounded-full border border-white/30 bg-neutral-800 object-cover"
              />
              <div className="min-w-0 flex-1 leading-tight">
                <p className="truncate font-semibold">{profile.handle}</p>
                <p className="truncate text-sm text-white/70">
                  {story.subtitle}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setManualPause((p) => !p)}
                aria-label={manualPause ? 'Play story' : 'Pause story'}
                className="pointer-events-auto flex size-9 items-center justify-center rounded-full transition-colors hover:bg-white/10"
              >
                {manualPause ? (
                  <Play className="size-6 fill-current" />
                ) : (
                  <Pause className="size-6 fill-current" />
                )}
              </button>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close story"
                className="pointer-events-auto flex size-9 items-center justify-center rounded-full transition-colors hover:bg-white/10"
              >
                <X className="size-6" />
              </button>
            </div>
          </div>

          {/* bottom: message + forward */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 flex items-center gap-3 bg-linear-to-t from-black/60 to-transparent px-5 pt-10 pb-5">
            <form
              onSubmit={sendToWhatsApp}
              className="pointer-events-auto relative flex-1"
            >
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onFocus={() => setTyping(true)}
                onBlur={() => setTyping(false)}
                placeholder="Send message…"
                aria-label="Message me on WhatsApp"
                className={`h-13 w-full rounded-full border border-white/40 bg-transparent pl-5 text-base text-white placeholder:text-white/80 focus:border-white focus:outline-none ${
                  text.trim() ? 'pr-24' : 'pr-5'
                }`}
              />
              {text.trim() && (
                <button
                  type="submit"
                  className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-neutral-900 hover:bg-stone-200"
                >
                  Send
                </button>
              )}
            </form>

            <button
              type="button"
              onClick={forward}
              aria-label="Share this portfolio"
              className="pointer-events-auto flex size-11 items-center justify-center rounded-full transition-colors hover:bg-white/10"
            >
              <Send className="size-7" strokeWidth={1.5} />
            </button>
          </div>

          <p
            aria-live="polite"
            className={`pointer-events-none absolute bottom-24 left-1/2 z-40 -translate-x-1/2 rounded-full bg-white px-4 py-2 text-sm font-medium text-neutral-900 shadow-lg transition-opacity duration-200 ${
              toast ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {toast}
          </p>
        </div>

        <button
          type="button"
          onClick={next}
          aria-label="Next story"
          className={`${roundBtn} hidden sm:flex ${index === total - 1 ? 'invisible' : ''}`}
        >
          <ChevronRight className="size-6" />
        </button>
      </div>
    </div>,
    document.body,
  );
}
