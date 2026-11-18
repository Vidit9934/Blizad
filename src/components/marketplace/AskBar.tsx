import { useEffect, useRef, useState } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import { Search } from 'lucide-react'
import { BoltGlyph } from '@/components/ui/Glyphs'
import { cn } from '@/lib/cn'
import { useMarketplace } from './store'

const EXAMPLES = [
  'more leads from Instagram',
  'a website for my clinic',
  'to show up on ChatGPT',
  'an MVP for my marketplace idea',
  'faster, safer hosting',
]

function useTypewriter(words: string[], active: boolean) {
  const [text, setText] = useState('')
  const [i, setI] = useState(0)
  const [del, setDel] = useState(false)
  useEffect(() => {
    if (!active) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setText(words[0])
      return
    }
    const full = words[i % words.length]
    const done = !del && text === full
    const empty = del && text === ''
    const t = setTimeout(
      () => {
        if (done) setDel(true)
        else if (empty) {
          setDel(false)
          setI((n) => n + 1)
        } else setText(del ? full.slice(0, text.length - 1) : full.slice(0, text.length + 1))
      },
      done ? 1700 : empty ? 300 : del ? 20 : 42,
    )
    return () => clearTimeout(t)
  }, [text, del, i, active, words])
  return text
}

export function AskBar({
  size = 'lg',
  autoFocus = false,
  className,
  id = 'ask',
}: {
  size?: 'md' | 'lg'
  autoFocus?: boolean
  className?: string
  id?: string
}) {
  const { ask } = useMarketplace()
  const [value, setValue] = useState('')
  const controls = useAnimationControls()
  const ref = useRef<HTMLInputElement>(null)
  const typed = useTypewriter(EXAMPLES, value === '')
  useEffect(() => {
    if (autoFocus) ref.current?.focus()
  }, [autoFocus])
  return (
    <motion.form
      animate={controls}
      onSubmit={(e) => {
        e.preventDefault()
        if (value.trim().length < 3) {
          void controls.start({ x: [0, -8, 8, -5, 5, 0], transition: { duration: 0.4 } })
          ref.current?.focus()
          return
        }
        ask(value)
      }}
      className={cn('askbar', className)}
    >
      <Search aria-hidden className="ml-4 size-4 shrink-0 text-muted" />
      <label htmlFor={id} className="sr-only">
        What do you need?
      </label>
      <input
        id={id}
        ref={ref}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoComplete="off"
        placeholder={`What do you need? e.g. ${typed || EXAMPLES[0]}`}
        className={cn(
          'min-w-0 flex-1 bg-transparent px-2 font-mono text-fg outline-none placeholder:text-subtle',
          size === 'lg' ? 'h-14 text-[15px]' : 'h-12 text-sm',
        )}
      />
      <button
        type="submit"
        data-cursor="Ask"
        className={cn(
          'inline-flex shrink-0 items-center gap-2 rounded-btn bg-accent font-medium text-accent-fg transition hover:brightness-110 active:scale-[.98]',
          size === 'lg' ? 'h-14 px-6' : 'h-12 px-5 text-sm',
        )}
      >
        <BoltGlyph className="h-4 w-3 text-spark" />
        <span className="hidden sm:inline">Ask Blizad</span>
        <span className="sm:hidden">Ask</span>
      </button>
    </motion.form>
  )
}
