import { ViteReactSSG } from 'vite-react-ssg'
import { routes } from './routes'
import '@fontsource-variable/bricolage-grotesque'
import '@fontsource-variable/jetbrains-mono'
import './styles/tokens.css'
import './styles/base.css'

export const createRoot = ViteReactSSG({ routes, basename: import.meta.env.BASE_URL })
