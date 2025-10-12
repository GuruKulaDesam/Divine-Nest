import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	base: '',
	plugins: [sveltekit()],
	server: {
		port: 3000,
		host: '127.0.0.1',
		fs: {
			allow: ['.']
		}
	},
	publicDir: 'public',
	optimizeDeps: {
		exclude: ['svelte-fullcalendar']
	}
});
