import type { VariantProps } from 'class-variance-authority'
import type { ButtonHTMLAttributes } from 'react'
import { cva } from 'class-variance-authority'
import styles from './PrimitiveButton.module.css'

const button = cva(styles.btn, {
  variants: {
    tone: {
      accent: styles['btn--accent'],
      ghost: styles['btn--ghost'],
      outline: styles['btn--outline'],
    },
    density: {
      comfy: styles['btn--comfy'],
      compact: styles['btn--compact'],
    },
  },
  defaultVariants: {
    tone: 'accent',
    density: 'comfy',
  },
})

type PrimitiveButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof button>

export function PrimitiveButton({ tone, density, className, children, type = 'button', ...rest }: PrimitiveButtonProps) {
  const buttonClass = button({ tone, density, className })

  return (
    <button className={buttonClass} type={type} {...rest}>
      {children}
    </button>
  )
}
