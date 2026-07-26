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

/**
 * Look images up by id, dropping any that no longer exist in the catalog.
 *
 * Image ids are hand-written across pages while the catalog is generated
 * content, so an id can go stale. Reading `.src` off the resulting `undefined`
 * throws mid-render and blanks the whole page, so every id list goes through
 * here instead of indexing KIMINOU_IMAGES directly.
 */
export function pickImages(...ids: string[]): KiminouImage[] {
  return ids.map((id) => KIMINOU_IMAGES[id]).filter((image): image is KiminouImage => Boolean(image));
}

export const KIMINOU_SPORTS_IMAGES: KiminouImage[] = pickImages(
  "basketballJumpShot",
  "basketballGameAction",
  "basketballWarmupSmile",
  "basketballHuddle",
  "basketballMediaPortrait",
  "footballLockerRoom",
  "footballMediaDay",
  "footballGameAction",
  "footballTeamTunnel",
);
