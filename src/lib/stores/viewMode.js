import { writable } from "svelte/store";

// View mode store - can be 'auto', 'mobile', or 'desktop'
export const viewMode = writable("auto");