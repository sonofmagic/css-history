import { badge, badgeRow, card, desc, pill, title } from '../styles/vanillaStyles.css'

const features = ['零运行时', '支持静态提取', '与 TS 配合友好']

export function VanillaExtractCard() {
  return (
    <section className={card}>
      <span className={pill}>vanilla-extract</span>
      <h3 className={title}>编译期提取 CSS 文件</h3>
      <p className={desc}>样式在构建期产出 .css，运行时仅剩 className；类型与自动完成都基于 TS。</p>
      <div className={badgeRow}>
        {features.map(item => (
          <span key={item} className={badge}>
            {item}
          </span>
        ))}
      </div>
    </section>
  )
}
