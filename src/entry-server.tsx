// Build-time pre-render of the cover (doors) so it paints before any JS runs.
import { renderToString } from 'react-dom/server'
import App from './App'

export const render = () => renderToString(<App />)
