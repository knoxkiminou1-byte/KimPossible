import kiminouImageData from "@/content/kiminouImages.json";

export type KiminouImageCategory = "Author" | "Athlete" | "Speaker" | "Strategy" | "Archive" | "Brand";

export type KiminouImage = {
  id: string;
  src: string;
  title: string;
  alt: string;
  caption: string;
  category: KiminouImageCategory;
  width: number;
  height: number;
  pages: string[];
  keywords?: string[];
};

const imageItems = kiminouImageData.images as KiminouImage[];

export const KIMINOU_IMAGES = Object.fromEntries(imageItems.map((image) => [image.id, image])) as Record<
  string,
  KiminouImage
>;

export const KIMINOU_MEDIA_IMAGES: KiminouImage[] = imageItems;

export const KIMINOU_ARCHIVE_IMAGES: KiminouImage[] = imageItems.filter(
  (image) => image.category !== "Brand" && image.pages.some((page) => page !== "/media"),
);

export const KIMINOU_SPORTS_IMAGES: KiminouImage[] = [
  "basketballJumpShot",
  "basketballGameAction",
  "basketballWarmupSmile",
  "basketballHuddle",
  "basketballMediaPortrait",
  "footballLockerRoom",
  "footballMediaDay",
  "footballGameAction",
  "footballTeamTunnel",
].map((id) => KIMINOU_IMAGES[id]);
