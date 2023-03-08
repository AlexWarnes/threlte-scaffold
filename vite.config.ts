import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import Icons from 'unplugin-icons/vite';

export default defineConfig({
	plugins: [
		Icons({
			compiler: 'svelte',
			autoInstall: true,
		}),
		sveltekit(),
	],
	ssr: {
		noExternal: ['three', 'troika-three-text']
	}
});
