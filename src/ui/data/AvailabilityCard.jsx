import { useEffect, useState } from 'react';
import { Download, MessageCircle } from 'lucide-react';
import Hint from './Hint';
import { whatsappUrl } from './Profile';

function useClock(timeZone) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 15_000);
    return () => clearInterval(id);
  }, []);

  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone,
  }).format(now);
}

export default function AvailabilityCard({ availability, cv, whatsapp }) {
  const time = useClock(availability.timeZone);

  return (
    <section className="rounded-3xl border border-black/10 p-5 dark:border-white/10">
      <div className="flex items-center gap-2.5 border-b border-black/10 pb-4 dark:border-white/10">
        <span className="relative flex size-2.5">
          {availability.open && (
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-500 opacity-60 motion-reduce:animate-none" />
          )}
          <span
            className={`relative inline-flex size-2.5 rounded-full ${
              availability.open ? 'bg-green-500' : 'bg-neutral-400'
            }`}
          />
        </span>
        <p className="font-semibold">{availability.label}</p>
      </div>

      <div className="mt-4 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium tracking-widest text-neutral-500 uppercase dark:text-neutral-400">
            {availability.timeLabel}
          </p>
          <p className="mt-1 text-3xl font-bold tabular-nums">{time}</p>
        </div>
        <p className="pb-1 text-sm text-neutral-500 dark:text-neutral-400">
          {availability.status}
        </p>
      </div>

      <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
        {availability.reply}
      </p>

      <div className="mt-4 flex gap-3">
        <Hint text="Grab my CV 📄" className="flex-1">
          <a
            href={cv.href}
            download={cv.filename}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-neutral-900 font-medium text-stone-50 transition-opacity hover:opacity-90 dark:bg-stone-100 dark:text-neutral-900"
          >
            <Download className="size-5" />
            Download CV
          </a>
        </Hint>

        <Hint text="Say hi on WhatsApp" align="end">
          <a
            href={whatsappUrl(whatsapp)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Message me on WhatsApp"
            className="flex size-12 items-center justify-center rounded-2xl border border-black/15 transition-colors hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
          >
            <MessageCircle className="size-5" />
          </a>
        </Hint>
      </div>
    </section>
  );
}
