import { Seo, faqLd } from '../components/Seo'
import { homeFaqs } from '../content/faq'
import { Hero } from '../scenes/home/Hero'
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

/** Scene order follows emotion: arrive, dream, believe, choose, see, proof, path, mechanism, decide, trust, doubt, act. */
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
      <Dream />
      <Proof />
      <Doors />
      <SearchEverywhere />
      <Builds />
      <Pedigree />
      <Voices />
      <Path />
      <Pipeline />
      <Estimator />
      <Founders />
      <Hub />
      <HomeFaq />
      <Close />
    </>
  )
}
