import { Outlet } from 'react-router-dom'
import { MotionProvider } from './motion/MotionProvider'
import { Cursor } from './motion/Cursor'
import { Curtain } from './motion/Curtain'
import { Atmosphere } from './components/Atmosphere'
import { Preloader } from './components/Preloader'
import { Nav } from './components/Nav'
import { Footer } from './components/Footer'
import { ChapterEdgeLabel } from './components/ChapterEdgeLabel'
import { Scene3DBoundary } from './three/Scene3DBoundary'

export default function Layout() {
  return (
    <MotionProvider>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Atmosphere />
      {/* Persists across routes exactly like Atmosphere/Cursor/Curtain — mounted once, never per-page. */}
      <Scene3DBoundary />
      <ChapterEdgeLabel />
      <Nav />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <Cursor />
      <Curtain />
      <Preloader />
    </MotionProvider>
  )
}
