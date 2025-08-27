import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	kit: { adapter: adapter() },
	compilerOptions: {
		experimental: {
			async: true
		},
		customElement: true,
		// disable all warnings coming from node_modules and all accessibility warnings
		warningFilter: (warning) =>
			!warning.filename?.includes('node_modules') && !warning.code.startsWith('a11y')
	}
};

export default config;
