import { Seo, faqLd } from '../components/Seo'
import { homeFaqs } from '../content/faq'
import { Hero } from '../scenes/home/Hero'
import { OfferingMarquee } from '../scenes/home/OfferingMarquee'
import { SplitScene } from '../scenes/home/SplitScene'
import { ProofNumbers } from '../scenes/home/ProofNumbers'
import { MarketplaceShelf } from '../scenes/home/MarketplaceShelf'
import { StackScene } from '../scenes/home/StackScene'
import { ToolsSpotlight } from '../scenes/home/ToolsSpotlight'
import { Manifesto } from '../scenes/home/Manifesto'
import { HowItWorks } from '../scenes/home/HowItWorks'
import { WorldTint } from '../components/immersive/WorldTint'
import { Builds } from '../scenes/home/Builds'
import { Founders } from '../scenes/home/Founders'
import { Close, HomeFaq } from '../scenes/home/Close'
import '../scenes/home/home.css'

/** v10 marketplace order: arrive, breadth, one counter, proof, choose, shipped, team, answers, act. */
export function Component() {
  return (
    <>
      <Seo
        title="Blizad | The growth marketplace for marketing, tech and tools"
        description="Hire Blizad for Meta, Google and LinkedIn ads, SEO, GEO and AEO; commission websites, web apps and hosting; or use our tools. One marketplace, built for momentum."
        path="/"
        jsonLd={[faqLd(homeFaqs)]}
      />
      <WorldTint />
      <Hero />
      <OfferingMarquee />
      <SplitScene />
      <ProofNumbers />
      <MarketplaceShelf />
      <StackScene />
      <ToolsSpotlight />
      <Manifesto />
      <Builds />
      <HowItWorks />
      <Founders />
      <HomeFaq />
      <Close />
    </>
  )
}
