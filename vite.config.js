import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	base: process.env.NODE_ENV === 'production' ? '/Home-Manager/' : '',
	server: {
		port: 3000,
		host: '127.0.0.1',
	},
	optimizeDeps: {
		exclude: ['svelte-fullcalendar']
	}
});
