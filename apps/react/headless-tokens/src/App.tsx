import type { CSSProperties } from 'react'
import type { TokenPack } from './tokens'
import { useMemo, useState } from 'react'
import { PrimitiveButton } from './components/PrimitiveButton'
import { generativeSuggestions, tokenPresets } from './tokens'
import './App.css'

const sampleActions = ['tokens → variants → primitives', 'UI 与 API 解耦', '多 Runtime (Web/RSC/小程序) 共享']

function App() {
  const [active, setActive] = useState<TokenPack>(tokenPresets[0])
  const [nextAi, setNextAi] = useState<TokenPack | null>(null)

  const cssVars = useMemo(
    () =>
      ({
        '--accent': active.accent,
        '--accent-muted': active.accentMuted,
        '--surface': active.surface,
        '--surface-subtle': active.surfaceSubtle,
        '--text': active.text,
        '--border': active.border,
        '--radius': active.radius,
      }) as CSSProperties,
    [active],
  )

  const pickTheme = (theme: TokenPack) => {
    setActive(theme)
  }

  const rollGenerative = () => {
    const suggestion = generativeSuggestions[Math.floor(Math.random() * generativeSuggestions.length)]
    setNextAi(suggestion)
    setActive(suggestion)
  }

  return (
    <main className="page">
      <section className="hero">
        <p className="eyebrow">2024 · tokens + headless 组件 + 生成式协作</p>
        <h1>样式抽象成 tokens，组件只负责逻辑</h1>
        <p className="hero-desc">
          Tokens 把颜色/间距抽象出样式方案之外，Headless 组件只暴露行为；设计师、AI 或脚本都可以替换 tokens，而 API 与交互保持稳定。
        </p>
      </section>

      <section className="grid">
        <article className="panel" style={cssVars}>
          <header className="panel__header">
            <span className="pill">tokens</span>
            <h2 className="panel__title">设计 token + headless primitives</h2>
            <p className="panel__desc">选择一个 token 包，下面的 Button/Panel 自动换肤，证明“样式可插拔、行为可复用”。</p>
          </header>
          <div className="theme-row">
            <span className="muted">主题：</span>
            <div className="theme-picker">
              {tokenPresets.map(theme => (
                <button
                  key={theme.name}
                  aria-pressed={theme.name === active.name}
                  className="chip"
                  type="button"
                  onClick={() => pickTheme(theme)}
                >
                  {theme.name}
                </button>
              ))}
            </div>
          </div>
          <div className="actions">
            <PrimitiveButton tone="accent">Headless CTA</PrimitiveButton>
            <PrimitiveButton tone="outline">Outline</PrimitiveButton>
            <PrimitiveButton tone="ghost" density="compact">
              Ghost
            </PrimitiveButton>
          </div>
          <ul className="list">
            {sampleActions.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="panel panel--muted" style={cssVars}>
          <header className="panel__header">
            <span className="pill pill--ghost">生成式 / 多 Runtime</span>
            <h2 className="panel__title">tokens 可被 AI / 脚本生成</h2>
            <p className="panel__desc">
              下一代方案会把 tokens 存在协议/JSON 中，AI 生成或脚本替换品牌即可，逻辑组件无需动刀；但也需要严格的白名单/评审链防止“风格漂移”。
            </p>
          </header>
          <div className="box">
            <p className="muted">生成式建议：</p>
            {nextAi
              ? (
                  <p className="muted">
                    accent:
                    {nextAi.accent}
                    {' '}
                    · surface:
                    {nextAi.surface}
                  </p>
                )
              : (
                  <p className="muted">点击下方按钮让 AI 随机给一组 tokens。</p>
                )}
            <PrimitiveButton density="compact" tone="outline" onClick={rollGenerative}>
              AI 建议一组 tokens
            </PrimitiveButton>
          </div>
          <div className="box box--warn">
            <p className="muted">风险：需要约束 + 评审</p>
            <ul className="list">
              <li>tokens 变更需走校验（lint / design review）。</li>
              <li>Headless 组件要留可插拔插槽，避免强绑定品牌。</li>
              <li>跨 Web/RSC/小程序共享 tokens，避免 runtime 拼 class。</li>
            </ul>
          </div>
        </article>
      </section>
    </main>
  )
}

export default App
