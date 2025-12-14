import { badge, badgeRow, card, desc, footer, metaRow, muted, pill, title } from '../styles/vanillaStyles.css'

const features = ['零运行时', '支持静态提取', '与 TS 配合友好']

export function VanillaExtractCard() {
  return (
    <section className={card}>
      <span className={pill}>vanilla-extract</span>
      <h3 className={title}>编译期提取 CSS 文件</h3>
      <p className={desc}>样式在构建期产出 .css，运行时仅剩 className；类型与自动完成都基于 TS。</p>
      <div className={metaRow}>
        <span className={muted}>同一 tokens 既能用于 TS，也能落入 CSS。</span>
        <span className={muted}>最小化注水体积，适合 SSR + Edge。</span>
      </div>
      <div className={badgeRow}>
        {features.map(item => (
          <span key={item} className={badge}>
            {item}
          </span>
        ))}
      </div>
      <p className={footer}>用法像 CSS Modules，但具备类型安全与零运行时开销。</p>
    </section>
  )
}
