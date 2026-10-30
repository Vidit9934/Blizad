import type { RouteRecord } from 'vite-react-ssg'
import Layout from './Layout'
import { services } from './content/services'

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout />,
    entry: 'src/Layout.tsx',
    children: [
      { index: true, lazy: () => import('./pages/Home') },
      { path: 'services', lazy: () => import('./pages/Services') },
      {
        path: 'services/:slug',
        lazy: () => import('./pages/ServiceDetail'),
        getStaticPaths: () => services.map((service) => `services/${service.slug}`),
      },
      { path: 'work', lazy: () => import('./pages/Work') },
      { path: 'about', lazy: () => import('./pages/About') },
      { path: 'contact', lazy: () => import('./pages/Contact') },
      { path: 'privacy', lazy: () => import('./pages/Privacy') },
      { path: '404', lazy: () => import('./pages/NotFound') },
      { path: '*', lazy: () => import('./pages/NotFound') },
    ],
  },
]
