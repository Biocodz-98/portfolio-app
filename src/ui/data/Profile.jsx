// Everything the left column shows lives here. Replace the placeholders.

export const profile = {
  name: 'Abiola Fabikun',
  verified: true,
  title: 'Full-Stack Developer',
  tagline: 'Building the next big thing.',
  avatar: '/abiola.png',

  github: 'https://github.com/Biocodz-98',

  whatsapp: {
    number: '+2347062087944',
    message: "Hi, I saw your portfolio and I'd like to talk.",
  },

  cv: {
    href: '/my-cv.pdf',
    filename: 'Abiola Fabikun-CV.pdf',
  },

  handle: 'abiola',

  // Circles under the buttons. Each one opens a story, in this order.
  // Add `image: "/about.jpg"` (in /public) to use a photo for the circle and the story background.
  highlights: [
    {
      key: 'about',
      label: 'About',
      icon: 'user',
      subtitle: 'About me',
      title: "Hi, I'm Abiola Fabikun",
      body: "I'm a full-stack developer who turns designs into fast, polished interfaces. At OneHealth I built the revamped website with React and TypeScript, and I care about clean code and the small details people notice.",
    },
    {
      key: 'stack',
      label: 'Stack',
      icon: 'layers',
      subtitle: 'My stack',
      title: 'What I build with',
      body: 'The tools I reach for every day: React, Next.js and TypeScript to build, Tailwind CSS to style.',
      chips: ['React', 'Next.js', 'Node.js', 'TypeScript', 'Tailwind CSS'],
    },
    {
      key: 'now',
      label: 'Now',
      icon: 'zap',
      subtitle: 'Right now',
      title: "What I'm up to",
      body: "Right now I'm creating solutions and shipping side projects over the weekend.",
    },
    {
      key: 'contact',
      label: 'Contact',
      icon: 'mail',
      subtitle: 'Contact',
      title: "Let's work together",
      body: 'Open to freelance or full time work roles. Hit the message on my profile to message me on whatsapp or follow me on Github.',
      cta: 'whatsapp',
    },
  ],

  experience: [
    {
      period: '10/2025 – 05/2026',
      current: false,
      company: 'OneHealth Pharmacy -',
      role: 'Frontend Developer Intern',
    },
    {
      period: '01/2025 – 03/2025',
      company: 'HNG Tech -',
      role: 'Frontend Developer Intern',
    },
    {
      period: '04/2023 – 10/2025',
      company: 'SAF Consultants -',
      role: 'IT Support Technician',
    },

    {
      period: '02/2023 – 04/2023',
      company: 'Tranter IT Infrastructure - ',
      role: 'IT Support Technician Intern',
    },

    {
      period: '11/2021 – 10/2022',
      company: 'Crown Flour Mills -',
      role: 'IT Support Technician',
    },
  ],

  achievements: [
    {
      icon: 'trophy',
      source: 'OneHealth',
      date: '2026',
      title: 'Shipped the revamped OneHealth website',
      description: 'Built the new site in React and TypeScript.',
      links: [
        {
          label: 'View project',
          href: 'https://onehealth-website-indol.vercel.app/',
          external: true,
        },
      ],
    },
  ],

  availability: {
    open: true,
    label: 'Open to freelance projects',
    timeZone: 'Africa/Lagos',
    timeLabel: 'Lagos time',
    status: 'Heads-down building 💻',
    reply: 'Usually replies within a day',
  },
};

export const whatsappUrl = ({ number, message }) =>
  `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
