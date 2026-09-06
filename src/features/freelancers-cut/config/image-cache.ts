import { preloadImages } from "@/features/freelancers-cut/components/settings/export/utils";

export let imageCache: Map<string, HTMLImageElement> | null = null;

export async function initCache() {
	if (!imageCache) {
		imageCache = await preloadImages();
	}
	return imageCache;
}
