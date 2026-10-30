import { useId } from 'react'
import type { ServiceFaq } from '../content/services'
import { Icon } from './Icon'
import './faq.css'

/** Native disclosure list: keyboard and no-JS friendly, answers stay in the HTML for search. */
export function Faq({ items }: { items: ServiceFaq[] }) {
  const hasCategories = items.some((item) => item.category)
  if (!hasCategories) return <FaqList items={items} />

  const groups = new Map<string, ServiceFaq[]>()
  items.forEach((item) => {
    const key = item.category ?? 'More'
    if (!groups.has(key)) groups.set(key, [])
    groups.get(key)!.push(item)
  })

  return (
    <div className="faq-columns">
      {[...groups.entries()].map(([category, groupItems]) => (
        <div key={category} className="faq-group">
          <h3 className="faq-group__title">{category}</h3>
          <FaqList items={groupItems} />
        </div>
      ))}
    </div>
  )
}

function FaqList({ items }: { items: ServiceFaq[] }) {
  const groupName = useId()
  return (
    <div className="faq">
      {items.map((item) => (
        <details key={item.q} name={groupName} className="faq__item">
          <summary>
            <h3 className="faq__q">{item.q}</h3>
            <Icon name="plus" size={22} className="faq__icon" />
          </summary>
          <div className="faq__a">
            <p>{item.a}</p>
          </div>
        </details>
      ))}
    </div>
  )
}
