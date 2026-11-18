import { Seo, faqLd } from '../components/Seo'
import { homeFaqs } from '../content/faq'
import { Hero } from '../scenes/home/Hero'
import { Ticker } from '../scenes/home/Ticker'
import { Dream } from '../scenes/home/Dream'
import { Proof } from '../scenes/home/Proof'
import { Doors } from '../scenes/home/Doors'
import { SearchEverywhere } from '../scenes/home/SearchEverywhere'
import { Builds } from '../scenes/home/Builds'
import { Pedigree } from '../scenes/home/Pedigree'
import { Voices } from '../scenes/home/Voices'
import { Path } from '../scenes/home/Path'
import { Pipeline } from '../scenes/home/Pipeline'
import { Estimator } from '../scenes/home/Estimator'
import { Founders } from '../scenes/home/Founders'
import { Hub } from '../scenes/home/Hub'
import { Close, HomeFaq } from '../scenes/home/Close'
import '../scenes/home/home.css'

/**
 * v9 scene order — reordered from a stock funnel (hero, statement, numbers...)
 * into: arrive (0) → breathe (1) → what we do (2) → proof gallery, alone (3) →
 * trust cluster (4) → how we work (5) → decide (6) → final trust + act (7).
 * See DESIGN.md's v9 chapter table for the full rationale.
 */
export function Component() {
  return (
    <>
      <Seo
        title="Blizad | Performance marketing, SEO and web development in Raipur"
        description="Blizad is a Raipur growth company. One team runs performance marketing, SEO, GEO and AEO, full-stack development and hosting. Built for momentum."
        path="/"
        jsonLd={[faqLd(homeFaqs)]}
      />
      <Hero />
      <Ticker />
      <Dream />
      <Doors />
      <SearchEverywhere />
      <Builds />
      <Pedigree />
      <Proof />
      <Path />
      <Pipeline />
      <Estimator />
      <Hub />
      <Voices />
      <Founders />
      <HomeFaq />
      <Close />
    </>
  )
}
