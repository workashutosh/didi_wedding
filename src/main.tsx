import { createRoot, hydrateRoot } from 'react-dom/client'
import './styles/fonts.css'
import './styles/index.css'
import App from './App'

// Always begin at the doors, scroll locked until the invitation is opened
if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
window.scrollTo(0, 0)
document.documentElement.classList.add('is-locked')

const root = document.getElementById('root')!
// The door scene is pre-rendered into index.html at build time → hydrate it.
if (root.firstElementChild) hydrateRoot(root, <App />)
else createRoot(root).render(<App />)
