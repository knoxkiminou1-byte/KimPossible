export type KiminouImage = {
  src: string;
  title: string;
  alt: string;
  caption: string;
  category: "Author" | "Athlete" | "Speaker" | "Strategy" | "Archive";
  width: number;
  height: number;
};

export const KIMINOU_IMAGES = {
  bwPortrait: {
    src: "/photos/kiminou-knox-bw-portrait.png",
    title: "Kiminou Knox black and white portrait",
    alt: "Kiminou Knox official black and white author portrait",
    caption: "Black and white portrait of Kiminou Knox for press and editorial use.",
    category: "Author" as const,
    width: 800,
    height: 1067,
  },
  officialHeadshot: {
    src: "/photos/kiminou-knox/kiminou-knox-official-author-headshot-2026.jpg",
    title: "Kiminou Knox official author headshot",
    alt: "Kiminou Knox official author headshot portrait",
    caption: "Official headshot of Kiminou Knox for author, press, and speaker profiles.",
    category: "Author",
    width: 3024,
    height: 4032,
  },
  outdoorPortrait: {
    src: "/photos/kiminou-knox-08-outdoor-candid.jpg",
    title: "Kiminou Knox outdoor portrait",
    alt: "Kiminou Knox standing outside near a blue door in a green striped shirt",
    caption: "Kiminou Knox outdoor portrait for biography and author profile pages.",
    category: "Author",
    width: 1536,
    height: 2048,
  },
  basketballHuddle: {
    src: "/photos/kiminou-knox/kiminou-knox-basketball-huddle.jpg",
    title: "Kiminou Knox basketball huddle",
    alt: "Kiminou Knox standing with teammates during a basketball game huddle",
    caption: "Kiminou Knox with teammates during a basketball game huddle.",
    category: "Athlete",
    width: 1194,
    height: 1270,
  },
  basketballJumpShot: {
    src: "/photos/kiminou-knox/kiminou-knox-basketball-jump-shot.jpg",
    title: "Kiminou Knox on the court",
    alt: "Kiminou Knox shooting a basketball during warmups in a gym",
    caption: "Kiminou Knox during basketball warmups.",
    category: "Athlete",
    width: 742,
    height: 931,
  },
  basketballWarmupSmile: {
    src: "/photos/kiminou-knox/kiminou-knox-basketball-warmup-smile.jpg",
    title: "Kiminou Knox basketball warmup",
    alt: "Kiminou Knox smiling during basketball warmups",
    caption: "Kiminou Knox smiling during basketball warmups.",
    category: "Athlete",
    width: 701,
    height: 879,
  },
  chessStrategy: {
    src: "/photos/kiminou-knox/kiminou-knox-chess-strategy.jpg",
    title: "Kiminou Knox chess strategy",
    alt: "Kiminou Knox studying a chess board",
    caption: "Kiminou Knox studying chess as a visual signal of strategy, focus, and discipline.",
    category: "Strategy",
    width: 3720,
    height: 2480,
  },
  footballMediaDay: {
    src: "/photos/kiminou-knox/kiminou-knox-football-media-day.jpg",
    title: "Kiminou Knox football media day",
    alt: "Kiminou Knox in football uniform with a media photographer on a field",
    caption: "Kiminou Knox in football uniform during a field media moment.",
    category: "Athlete",
    width: 6720,
    height: 3776,
  },
  footballLockerRoom: {
    src: "/photos/kiminou-knox/kiminou-knox-ygnacio-football-locker-room.jpg",
    title: "Kiminou Knox Ygnacio football locker room",
    alt: "Kiminou Knox seated in a Ygnacio football uniform in the locker room",
    caption: "Kiminou Knox seated in a Ygnacio football uniform in the locker room.",
    category: "Athlete",
    width: 934,
    height: 1164,
  },
} as const satisfies Record<string, KiminouImage>;

export const KIMINOU_ARCHIVE_IMAGES: KiminouImage[] = [
  KIMINOU_IMAGES.outdoorPortrait,
  KIMINOU_IMAGES.officialHeadshot,
  KIMINOU_IMAGES.basketballJumpShot,
  KIMINOU_IMAGES.basketballWarmupSmile,
  KIMINOU_IMAGES.basketballHuddle,
  KIMINOU_IMAGES.chessStrategy,
  KIMINOU_IMAGES.footballLockerRoom,
  KIMINOU_IMAGES.footballMediaDay,
];

export const KIMINOU_SPORTS_IMAGES: KiminouImage[] = [
  KIMINOU_IMAGES.basketballJumpShot,
  KIMINOU_IMAGES.basketballWarmupSmile,
  KIMINOU_IMAGES.basketballHuddle,
  KIMINOU_IMAGES.footballLockerRoom,
  KIMINOU_IMAGES.footballMediaDay,
];
