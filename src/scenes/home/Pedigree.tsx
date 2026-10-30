import { useRef } from 'react'
import { Icon } from '../../components/Icon'
import { credentials, type Credential } from '../../content/credentials'
import { useMagnetic } from '../../motion/pointer'
import { useSceneReveals } from '../../motion/useSceneReveals'

/** Scene 7 — Believe (engineering). Names set as type with a real icon, never a borrowed logo. */
export function Pedigree() {
  const scope = useRef<HTMLElement>(null)
  useSceneReveals(scope)
  return (
    <section ref={scope} className="scene scene--ice pedigree" aria-labelledby="pedigree-title" data-beat="3">
      <div className="shell shell--wide">
        <h2 id="pedigree-title" className="t-statement pedigree__title">
          Engineering for Google and Thomson Reuters. Now building for you.
        </h2>
        <ul role="list" className="pedigree__list">
          {credentials.map((credential) => (
            <CredentialItem key={credential.name} credential={credential} />
          ))}
        </ul>
      </div>
    </section>
  )
}

/* Editorial-trust register stays quiet — no spotlight/tilt here, only the
   sanctioned icon micro-bounce and a light magnetic nudge on a real verify link. */
function CredentialItem({ credential }: { credential: Credential }) {
  const verify = useRef<HTMLAnchorElement>(null)
  useMagnetic(verify, 0.2, 10)
  return (
    <li className={`pedigree__item pedigree__item--${credential.kind}`} data-reveal="rise">
      <Icon name={credential.icon} className="pedigree__icon icon-bounce" size={26} />
      <p className="pedigree__name">{credential.name}</p>
      <p className="t-small">{credential.detail}</p>
      {/* Only a real, owner-supplied link earns a "Verify" line — never a fabricated badge (L4). */}
      {credential.url && (
        <a ref={verify} href={credential.url} target="_blank" rel="noopener noreferrer" className="text-link pedigree__verify">
          Verify
          <Icon name="external" size={14} />
        </a>
      )}
    </li>
  )
}
