import { PlaceholderTag } from '../components/PlaceholderTag'
import { Seo } from '../components/Seo'
import { site } from '../content/site'
import { PageHero, PageSection } from './PageHero'

/** Describes what this site actually does with data. Must be reviewed by counsel before launch. */
export function Component() {
  return (
    <>
      <Seo title="Privacy notice" description="How the Blizad website handles enquiry details and analytics." path="/privacy" />
      <PageHero title="Privacy notice." line="What this website collects, and what it doesn’t." />
      <PageSection>
        <div className="shell">
          <div className="prose">
            <p>
              Draft for review.
              <PlaceholderTag label="Pending legal review" />
            </p>
            <h2>Enquiry forms</h2>
            <p>
              Our forms do not store or transmit your details. When you submit one, your browser prepares a message that you
              choose to send to us by WhatsApp or email. We only receive what you send.
            </p>
            <h2>How we use your details</h2>
            <p>
              We use the details you send to reply to your enquiry and to discuss the work you asked about. We do not sell your
              data or add you to marketing lists without your consent.
            </p>
            <h2>Analytics</h2>
            <p>
              If analytics are enabled, we measure anonymous page and button events (for example, that a form was started). We
              never send your name, email or phone number to analytics tools.
            </p>
            <h2>Your choices</h2>
            <ul>
              <li>Ask us what information we hold about you.</li>
              <li>Ask us to correct or delete it.</li>
              <li>Withdraw consent to being contacted at any time.</li>
            </ul>
            <h2>Contact</h2>
            <p>
              {site.legalName.value}, {site.city}, {site.region}, {site.country}. Email{' '}
              <a href={`mailto:${site.email.value}`} className="text-link">
                {site.email.value}
              </a>
              .
            </p>
          </div>
        </div>
      </PageSection>
    </>
  )
}
