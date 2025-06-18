import './app.css'
import { mount } from 'svelte'
import App from './App.svelte'
import './lib/i18n/index.js'

const app = mount(App, {
  target: document.getElementById('app')
})

export default app
