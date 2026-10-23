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
  /** Owner-approved photo set (2026-10-22). Drives featured placements and the image sitemap. */
  approved?: boolean;
  ownerPhotoNumber?: number;
  sha256?: string;
};

// Keep in sync with RESPONSIVE_WIDTHS in scripts/generate-photo-variants.mjs.
const RESPONSIVE_WIDTHS = [480, 960, 1600];

const imageItems = kiminouImageData.images as KiminouImage[];

export const KIMINOU_IMAGES = Object.fromEntries(imageItems.map((image) => [image.id, image])) as Record<
  string,
  KiminouImage
>;

export const KIMINOU_MEDIA_IMAGES: KiminouImage[] = imageItems;

export const KIMINOU_FEATURED_IMAGES: KiminouImage[] = imageItems.filter((image) => image.approved);

export const KIMINOU_ARCHIVE_IMAGES: KiminouImage[] = imageItems.filter(
  (image) => image.category !== "Brand" && image.pages.some((page) => page !== "/media"),
);

/**
 * `srcset` for an approved photo: generated WebP widths plus the original file
 * as the largest candidate. Other images have no variants and get undefined.
 */
export function imageSrcSet(image: KiminouImage): string | undefined {
  if (!image.approved) return undefined;
  const dot = image.src.lastIndexOf(".");
  const slash = image.src.lastIndexOf("/");
  const base = `${image.src.slice(0, slash)}/responsive/${image.src.slice(slash + 1, dot)}`;
  return [
    ...RESPONSIVE_WIDTHS.filter((width) => width < image.width).map((width) => `${base}-${width}w.webp ${width}w`),
    `${image.src} ${image.width}w`,
  ].join(", ");
}

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
  "basketballMediaPortrait",
  "basketballTeamSideline",
  "basketballJumpShot",
  "basketballWarmupSmile",
  "footballLockerRoom",
  "footballFieldPhoto",
  "footballGameAction",
);
