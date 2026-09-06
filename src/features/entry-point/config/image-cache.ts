import { preloadImages } from "@/features/entry-point/components/settings/export/utils";

export let imageCache: Map<string, HTMLImageElement> | null = null;

export async function initCache() {
	if (!imageCache) {
		imageCache = await preloadImages();
	}
	return imageCache;
}
