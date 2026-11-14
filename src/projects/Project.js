// All project content lives here. Images go in /public (paths below).
// Anything you leave out (category, year, screenshots, included, problem…) is simply not shown.
// `liveUrl: null` shows a "Soon" button and sends the list row to the case study instead.

export const projects = [
  {
    slug: 'imani',
    name: 'OneHealth-Imani',
    featured: true,
    icon: '/icon.png',
    banner: '/screenshot 6.png',
    tags: ['Healthcare', 'Medications'],
    tagline: 'You Deserve More Than Just a Pump — You Deserve Freedom.',
    description:
      'Imani is the breast pump that gives parents back their time, energy, and peace of mind. It’s built for people who can’t pause their day to pump: it’s designed to be used on the go, to save hours, and to pump faster. My job was to bring that promise to life in the product experience, so the interface felt as effortless as the pump itself.',
    liveUrl: 'https://imani-onehealth.vercel.app/',
    platform: 'Web',
    stats: [
      //   { value: '30', label: 'payout figures obtained' },
      //   { value: '366', label: 'days the custom date range can take' },
    ],
    screenshots: [
      '/screenshot 7.png',
      '/screenshot 8.png',
      '/screenshot 9.png',
    ],

    role: [
      'Built the frontend in React and TypeScript',
      'Turned the design system and screens into reusable, typed components',
      'Responsive and mobile-first work, since the product is used on the go',
      'Accessibility, performance, and collaboration with design and backend',
    ],

    problem: [
      'Pumping is often a time-consuming, tethered routine. Parents juggle work, sleep, and caring for a baby, and traditional pumps mean being stuck in one place for long stretches, with setup, cleanup, and constant planning around the schedule. The result is exhaustion and stress, which is the opposite of the peace of mind new parents need.',
    ],

    solution: [
      'Pump on the go: a portable, hands-free-friendly experience that fits into real life, not just a quiet room at home. Save hours: fewer steps, less setup, and clear flows so time goes back to the parent.',
    ],
  },

  {
    slug: 'oneHealth',
    name: 'OneHealth',
    featured: true,
    icon: '/icon.png',
    banner: '/screenshot 2.png',
    tags: ['Consultations', 'Medications', 'Healthcare'],
    tagline: 'Online Pharmacy & Healthcare Solutions.',
    description:
      'Digital infrastructure for individuals, payers and providers for easy access to quality medicines and healthcare solutions.',
    liveUrl: 'https://onehealth-website-indol.vercel.app/',
    category: 'Healthcare',
    platform: 'Web',
    year: '2026',
    stats: [],
    screenshots: [],

    problem:
      'Access to quality medicines and healthcare is fragmented. Individuals struggle to find trusted pharmacies and consultations, while payers and providers work across disconnected systems. The old OneHealth website did not reflect the breadth of what the company offers, which made it harder for each audience to understand the services and take the next step.',

    solution:
      'OneHealth is digital infrastructure that brings individuals, payers and providers together on one platform for medicines, consultations and healthcare solutions. I rebuilt the website to present this clearly, with a fast, responsive interface that routes each audience to what they need.',

    timeline: 'January 2026',

    role: [
      'Frontend developer at OneHealth',
      'Built the revamped website in React and TypeScript',
      'Turned the approved designs into responsive, reusable components',
      'Worked with design and product to ship the live site',
    ],
  },

  {
    slug: 'pillmova',
    name: 'OneHealth-Pillmova',
    featured: true,
    icon: '/icon.png',
    banner: '/screenshot 3.png',
    tags: ['Logistics', 'Medication', 'Healthcare'],
    tagline: 'Redefining the face of pharma logistics and mobility in Nigeria',
    description:
      'PillMova is a logistics company specialized in the safe and quick delivery of pharma products.',
    liveUrl: 'https://pillmova.co/',
    category: 'Logistics',
    platform: 'Web',
    year: '2026',
    stats: [],
    screenshots: [
      //   '/screenshot 3.png',
      //   '/screenshot 4.png',
      //   '/screenshot 5.png',
    ],

    problem:
      'Getting medication from pharmacies and suppliers to the people who need it is slow and unreliable in Nigeria. Pharma products are time-sensitive and need careful handling, but they often move through general-purpose couriers or informal arrangements, where speed, safety and accountability are left to chance. Patients and pharmacies have no dependable way to book a delivery or see where it is, and the logistics side lacks a trusted brand built specifically for healthcare.',

    solution:
      'Pillmova is a logistics service built around pharma, focused on safe, quick delivery. I built the web experience that presents the service and lets people get started, with a clear, trustworthy interface that matches the brand promise of reliable mobility for medication.',

    timeline: 'Jan 2026',

    role: [
      'Frontend developer at OneHealth',
      'Built the Pillmova interface in React and TypeScript',
      'Turned the approved designs into responsive, reusable components',
      'Worked with design and product to ship the live site',
    ],
  },

  {
    slug: 'tutor',
    name: 'Tutor',
    icon: '/tutor-icon.png',
    tags: ['Education', 'EduTech'],
    description:
      'Tutor is a platform that allows you to create and share your own video courses with the world. Whether you are an expert in a particular field or just have a passion for teaching. Tutor makes it easy to create and share your knowledge. ',
    liveUrl: 'https://tutor-website-three-beige.vercel.app/',
  },

  {
    slug: 'luno',
    name: 'Luno',
    icon: '/luno-icon.png',
    tags: ['Health', 'Wellness'],
    description:
      'Your productivity assistant.Boost your productivity and improve your health with Leno - the all-in-one app for developers and creators.',
    liveUrl: 'https://luno-website-mu.vercel.app/',
  },

  {
    slug: 'lumina',
    name: 'Lumina',
    icon: '/lumina-icon.ico',
    tags: ['Photography'],
    description:
      'We offer full-stack Web Development services tailored to bring your digital vision to life. From responsive front-end interfaces to robust back-end systems, we build secure, fast, and scalable web applications using modern technologies and best practices.',
    liveUrl: 'lumina-app-roan.vercel.app',
  },
];

export const getProject = (slug) => projects.find((p) => p.slug === slug);

export const hostOf = (url) => {
  try {
    return new URL(url).host.replace(/^www\./, '');
  } catch {
    return url;
  }
};
