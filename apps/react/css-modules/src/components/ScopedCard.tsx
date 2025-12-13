import type { ReactNode } from 'react'
import styles from './scoped-card.module.css'

interface ScopedCardProps {
  title: string
  eyebrow: string
  points: string[]
  note?: string
  elevated?: boolean
  children?: ReactNode
}

export function ScopedCard({ title, eyebrow, points, note, elevated = true, children }: ScopedCardProps) {
  const cardClass = `${styles.card} ${elevated ? styles.elevated : ''}`.trim()

  return (
    <section className={cardClass}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h2 className={styles.title}>{title}</h2>
      <ul className={styles.list}>
        {points.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      {note ? <p className={styles.note}>{note}</p> : null}
      {children}
    </section>
  )
}
