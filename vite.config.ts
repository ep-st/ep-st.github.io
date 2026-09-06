// biome-ignore lint/correctness/noNodejsModules: Need it
import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// biome-ignore lint/style/noDefaultExport: Need it
export default defineConfig({
	plugins: [
		tailwindcss(),
		react(),
		// cloudflare()
	],
	resolve: {
		tsconfigPaths: true,
		alias: {
			"@": path.resolve(import.meta.dirname, "./src"),
		},
	},
});
