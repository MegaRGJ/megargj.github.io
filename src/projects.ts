// All portfolio content lives here. The timeline and the project pages are
// both generated from this list, so adding a project means adding one entry.

export type Category = 'Studio' | 'Personal' | 'University' | 'Game Jam';

export interface Project {
  slug: string; // used in the URL: project.html#slug
  title: string;
  date: string; // YYYY-MM or just YYYY, used for ordering (newest first)
  dateLabel?: string; // shown instead of the date, e.g. '2025 – Present'
  category?: Category;
  studios?: { name: string; color: string }[]; // shown as coloured tags instead of the category
  role?: string;
  summary?: string; // one or two lines shown on the timeline card
  tech: string[];
  featured?: boolean;
  image?: string; // path in public/, e.g. 'images/my-game.gif'
  placeholder?: string; // text in the frame when there is no image
  video?: string; // YouTube video id, shown at the top of the project page
  gallery?: string[]; // screenshots shown on the project page, paths in public/
  facts: {
    team?: string;
    duration?: string;
    engine?: string;
    platform?: string;
  };
  // A project gets its own page once it has sections. A blank line in body
  // starts a new paragraph.
  sections: { heading: string; body: string }[];
  links?: { label: string; url: string }[];
}

export const projects: Project[] = [
  {
    slug: 'ship-it',
    title: 'Ship It',
    date: '2023',
    category: 'Game Jam',
    role: 'Programmer',
    summary:
      'An online co-op game for up to 4 friends, where little robots chop shop spaceships and rebuild with mismatching colours for the most part.',
    tech: ['Unreal Engine', 'Epic Games Jam', 'Steam', 'EOS'],
    image: 'images/ship-it/cover.jpg',
    video: 'GNMB4BZZcxU',
    gallery: [
      'images/ship-it/screenshot-1.jpg',
      'images/ship-it/screenshot-2.jpg',
      'images/ship-it/screenshot-3.jpg',
      'images/ship-it/screenshot-4.jpg',
    ],
    facts: { team: '5 people', engine: 'Unreal Engine', platform: 'Windows' },
    sections: [
      {
        heading: 'Overview',
        body: `On this project I was working with some friends from Flix and CA. The area of code I picked up was setting up online multiplayer with friend codes and getting the UI functional.

Originally I implemented Epic Online Services, as it was an Epic Games jam. But shortly after fully setting up multiplayer and UI we ran into a blocker, where we found out we could not share the game with others without adding their accounts to the dev environment.

Because of this I pivoted it to Steam so we could use Spacewar, which was pretty quick to do as I only needed to update the functions within a subsystem.

It was a good learning experience on EOS, just a shame there's not really a public release without signing up as a business and getting approval from Epic.`,
      },
    ],
    links: [{ label: 'Take a look on itch.io', url: 'https://tomshinton.itch.io/ship-it' }],
  },

  {
    slug: 'secret-project',
    title: 'Secret Project',
    date: '2025',
    dateLabel: '2025 – Present',
    summary: 'Unannounced, so this one stays under wraps for now.',
    placeholder: 'Under wraps',
    tech: [],
    facts: {},
    sections: [],
  },
  {
    slug: 'sea-of-thieves-arena',
    title: 'Sea of Thieves: Anniversary Update - The Arena',
    date: '2019',
    studios: [
      { name: 'Flix', color: 'rgb(37, 150, 190)' },
      { name: 'RARE', color: '#e4aa31' },
    ],
    role: 'Programmer',
    summary:
      'A competitive mode for Sea of Thieves, where up to five crews race to find and deliver treasure while fighting each other in short matches.',
    tech: ['Unreal Engine', 'Xbox'],
    image: 'images/sea-of-thieves-arena/cover.png',
    video: 'j9aUwwenheQ',
    facts: { team: '100+ people', engine: 'Unreal Engine', platform: 'Windows, Xbox' },
    sections: [
      {
        heading: 'Overview',
        body: `I started working on Sea of Thieves in late 2018, helping out on The Arena for the Anniversary Update.

It exposed me to the inner workings of AAA game development and a heavily tested environment, with automation such as unit and integration tests, and highly structured processes for releasing updates on a live service game that shipped every month.

It also let me own areas of the Arena such as the score system, and expand others such as notifications, player damage in the Red Sea, QA debugging support, achievements and lots of bug fixing.

Unfortunately the mode was closed in March 2022, but it seemed very loved, as the community still often mentions it now.`,
      },
    ],
  },
  {
    slug: 'sea-of-thieves-ships-of-fortune',
    title: 'Sea of Thieves: Ships of Fortune',
    date: '2020',
    studios: [
      { name: 'Flix', color: 'rgb(37, 150, 190)' },
      { name: 'RARE', color: '#e4aa31' },
    ],
    role: 'Programmer',
    summary: 'A content update for Sea of Thieves, continuing my work on the game after The Arena.',
    tech: ['Unreal Engine', 'Xbox'],
    image: 'images/sea-of-thieves-ships-of-fortune/cover.webp',
    video: 'm-4fuUaC98Y',
    facts: { team: '100+ people', engine: 'Unreal Engine', platform: 'Windows, Xbox' },
    sections: [
      {
        heading: 'Overview',
        body: `This update was once again an effort across many teams. My focuses were optimisations, telemetry, and supporting my seniors with expanded ship damage such as fire, and player reviving.

I also worked on Arena 2.0, covering ship customisations, early quitter penalties and the new Arena beacon with client-side prediction.

Shortly after this release, I took ownership of the rework of the UI radials from another team, which gave me a taste of coordinating other programmers to help complete parts of the feature.

COVID also started around this time, which was loads of fun :)`,
      },
    ],
  },
  {
    slug: 'eden-star',
    title: 'Eden Star',
    date: '2018',
    studios: [{ name: 'Flix', color: 'rgb(37, 150, 190)' }],
    role: 'Programmer',
    summary:
      'An open world multiplayer sci-fi survival game on a hostile alien world, mixing physics-based combat, destructible environments and free-form building.',
    tech: ['Unreal Engine', 'Steam', 'Indie'],
    image: 'images/eden-star/cover.png',
    facts: { team: 'About 20 people', engine: 'Unreal Engine', platform: 'Windows' },
    sections: [
      {
        heading: 'Overview',
        body: `Eden Star was the first video game I worked on in the industry, and the first time I'd used Unreal Engine.

In the short time I worked on it, I learned to pick up skills quickly in a small indie team of around 20 people, working on the tutorial notifications, the spear weapon and bug fixing, and getting to understand multiplayer in Unreal.`,
      },
    ],
    links: [{ label: 'View on Steam', url: 'https://store.steampowered.com/app/259570/EDEN_STAR/' }],
  },
];

export function sortedProjects(): Project[] {
  return [...projects].sort((a, b) => b.date.localeCompare(a.date));
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function formatDate(date: string): string {
  const [year, month] = date.split('-');
  return month ? `${MONTHS[Number(month) - 1]} ${year}` : year;
}

// The tags beside the date: the studios if the project names any, or its category
export function pillsFor(project: Project): string {
  if (project.studios?.length) {
    return project.studios
      .map((studio) => `<span class="pill pill-studio" style="--studio: ${studio.color}">${studio.name}</span>`)
      .join('');
  }
  return project.category ? `<span class="pill">${project.category}</span>` : '';
}

export function hasPage(project: Project): boolean {
  return project.sections.length > 0;
}

// The project's screenshot or GIF, or a plain labelled frame until it has one
export function mediaFor(project: Project, lazy = true): string {
  if (project.image) return `<img src="${project.image}" alt="" ${lazy ? 'loading="lazy"' : ''} />`;
  return `<span class="media-empty">${project.placeholder ?? 'Your screenshot or GIF'}</span>`;
}
