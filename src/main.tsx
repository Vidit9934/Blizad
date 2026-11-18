import { ViteReactSSG } from 'vite-react-ssg'
import { routes } from './routes'
import '@fontsource-variable/jetbrains-mono'
import './styles/tokens.css'
import './styles/base.css'
import './styles/tailwind.css'

export const createRoot = ViteReactSSG({ routes, basename: import.meta.env.BASE_URL })
