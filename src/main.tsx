import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import { enableMapSet } from "immer";
import { NuqsAdapter } from "nuqs/adapters/react-router/v7";
// biome-ignore lint/correctness/noUnresolvedImports: Idk
import { StrictMode } from "react";
import { EntryPoint } from "./pages/entry-point";
import { FreelancersCut } from "./pages/freelancers-cut";
import { Home } from "./pages/home";

// biome-ignore lint/style/noNonNullAssertion: Well, if root is gone so is the whole app
const root = document.getElementById("root")!;

enableMapSet();

createRoot(root).render(
	<StrictMode>
		<BrowserRouter>
			<NuqsAdapter>
				<App />
			</NuqsAdapter>
		</BrowserRouter>
	</StrictMode>,
);

// biome-ignore lint/style/useComponentExportOnlyModules: <Used in the same file>
function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="entry-point" element={<EntryPoint />} />
			<Route path="freelancers-cut" element={<FreelancersCut />} />
		</Routes>
	);
}
