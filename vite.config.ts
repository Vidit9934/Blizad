import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * `vite preview` falls back to the home page for /contact (no trailing slash),
 * while real static hosts serve /contact/index.html. Mirror the hosts so local
 * QA sees the same pre-rendered HTML a visitor or crawler would.
 */
function previewDirectoryIndex(): Plugin {
  return {
    name: 'preview-directory-index',
    configurePreviewServer(server) {
      server.middlewares.use((req, _res, next) => {
        const [path, query = ''] = (req.url ?? '').split('?')
        if (path && !path.endsWith('/') && !/\.[a-z0-9]+$/i.test(path) && existsSync(join('dist', path, 'index.html'))) {
          req.url = `${path}/index.html${query ? `?${query}` : ''}`
        }
        next()
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), previewDirectoryIndex()],
  ssgOptions: {
    dirStyle: 'nested',
    formatting: 'none',
    script: 'async',
  },
})
