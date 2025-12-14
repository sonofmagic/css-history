import * as stylex from '@stylexjs/stylex'
import { palette } from '../styles/theme'

const styles = stylex.create({
  card: {
    display: 'grid',
    gap: 10,
    padding: 16,
    color: palette.ink,
    backgroundColor: '#f8fafc',
    borderRadius: 14,
    border: '1px solid #e2e8f0',
    boxShadow: '0 12px 28px rgb(15 23 42 / 8%)',
  },
  pill: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    width: 'fit-content',
    paddingBlock: 4,
    paddingInline: 10,
    fontSize: 12,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: '#0ea5e9',
    backgroundColor: 'rgb(14 165 233 / 12%)',
    border: '1px solid rgb(14 165 233 / 40%)',
    borderRadius: 999,
  },
  title: {
    margin: 0,
    fontSize: 18,
  },
  desc: {
    margin: 0,
    color: '#475569',
  },
  button: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    paddingBlock: 10,
    paddingInline: 12,
    fontWeight: 600,
    borderRadius: 12,
    border: '1px solid transparent',
    color: '#fff',
    backgroundColor: '#0ea5e9',
    boxShadow: '0 10px 24px rgb(14 165 233 / 26%)',
    cursor: 'pointer',
  },
  ghost: {
    color: '#0f172a',
    backgroundColor: 'transparent',
    border: '1px solid #cbd5e1',
    boxShadow: 'none',
  },
  row: {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap',
  },
  meta: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    padding: '4px 8px',
    color: '#475569',
    backgroundColor: '#f1f5f9',
    borderRadius: 10,
    border: '1px dashed #cbd5e1',
  },
})

export function StylexCard() {
  return (
    <section {...stylex.props(styles.card)}>
      <span {...stylex.props(styles.pill)}>stylex</span>
      <h3 {...stylex.props(styles.title)}>inline 样式 + 编译期映射</h3>
      <p {...stylex.props(styles.desc)}>
        stylex 将 JS 对象编译为原子类，运行时仅保留类名映射；使用风格更接近 inline style，便于静态摇树。
      </p>
      <div {...stylex.props(styles.row)}>
        <button {...stylex.props(styles.button)} type="button">
          原子化 class
        </button>
        <button {...stylex.props(styles.button, styles.ghost)} type="button">
          Ghost
        </button>
      </div>
      <span {...stylex.props(styles.meta)}>编译期映射 + 运行时极轻</span>
    </section>
  )
}
