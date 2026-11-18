import clsx, { type ClassValue } from 'clsx'

/** Plain clsx — no tailwind-merge (prompt §8.8). */
export const cn = (...inputs: ClassValue[]) => clsx(inputs)
