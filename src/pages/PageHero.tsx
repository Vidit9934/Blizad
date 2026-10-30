import { useRef, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useSceneReveals } from '../motion/useSceneReveals'
import './pages.css'

interface PageHeroProps {
  title: string
  line: string
  crumbs?: { name: string; path: string }[]
  children?: ReactNode
}

/** Inner-page opening: a giant light title and one line of at most 14 words. */
export function PageHero({ title, line, crumbs, children }: PageHeroProps) {
  const scope = useRef<HTMLElement>(null)
  useSceneReveals(scope)
  return (
    <header ref={scope} className="page-hero">
      <div className="shell shell--wide">
        {crumbs && (
          <nav aria-label="Breadcrumb" className="crumbs">
            <ol role="list">
              {crumbs.map((crumb, index) => (
                <li key={crumb.path}>
                  {index < crumbs.length - 1 ? <Link to={crumb.path}>{crumb.name}</Link> : <span aria-current="page">{crumb.name}</span>}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <h1 className="page-hero__title">
          {title}
        </h1>
        <p className="page-hero__line t-lead">
          {line}
        </p>
        {children}
      </div>
    </header>
  )
}

/** The named CTA that closes every inner page. */
export function PageCta({ title = 'Your next stage of growth starts here.' }: { title?: string }) {
  return (
    <PageSection>
      <div className="shell shell--wide page-cta">
        <h2>{title}</h2>
        <Link to="/contact" className="btn btn--primary btn--large">
          Start a project
        </Link>
      </div>
    </PageSection>
  )
}

/** Reveals for a page body section. */
export function PageSection({ children, className = '', id, labelledBy }: { children: ReactNode; className?: string; id?: string; labelledBy?: string }) {
  const scope = useRef<HTMLElement>(null)
  useSceneReveals(scope)
  return (
    <section ref={scope} id={id} className={`page-section ${className}`} aria-labelledby={labelledBy}>
      {children}
    </section>
  )
}
