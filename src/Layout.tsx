import { Outlet } from 'react-router-dom'
import { MotionProvider } from './motion/MotionProvider'
import { Cursor } from './motion/Cursor'
import { Curtain } from './motion/Curtain'
import { Atmosphere } from './components/Atmosphere'
import { Preloader } from './components/Preloader'
import { Nav } from './components/Nav'
import { Footer } from './components/Footer'
import { MarketplaceProvider } from './components/marketplace/store'
import { AskPalette } from './components/marketplace/AskPalette'
import { Scene3DBoundary } from './three/Scene3DBoundary'

export default function Layout() {
  return (
    <MotionProvider>
      <MarketplaceProvider>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Atmosphere />
      {/* Persists across routes exactly like Atmosphere/Cursor/Curtain — mounted once, never per-page. */}
      <Scene3DBoundary />
      <Nav />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <Cursor />
      <Curtain />
      <Preloader />
      <AskPalette />
      </MarketplaceProvider>
    </MotionProvider>
  )
}
