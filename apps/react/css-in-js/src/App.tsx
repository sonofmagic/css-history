import type { ThemeKey } from './styles/theme'
import { cx } from '@emotion/css'
import { useMemo, useState } from 'react'
import { StyledComponentsCard } from './components/StyledComponentsCard'
import StyledJsxCard from './components/StyledJsxCard'
import { StylexCard } from './components/StylexCard'
import { VanillaExtractCard } from './components/VanillaExtractCard'
import {
  codeBox,
  featureGrid,
  gridTwo,
  heroShell,
  makeButtonClass,
  makeCardClass,
  metaRow,
  metricLabel,
  metricRow,
  metricValue,
  note,
  pill,
  pillAccent,
  pillGhost,
  ribbon,
  runtimeNote,
  sectionHeading,
  tag,
  warningBox,
} from './styles/primitives'
import { palette, themes } from './styles/theme'

function App() {
  const [mode, setMode] = useState<ThemeKey>('dark')
  const [animatedBorder, setAnimatedBorder] = useState(true)
  const [hydrationSize, setHydrationSize] = useState(62)

  const cardClass = useMemo(() => makeCardClass(mode), [mode])
  const btnClass = useMemo(() => makeButtonClass(mode, animatedBorder), [animatedBorder, mode])

  const modeLabel = mode === 'dark' ? '暗色运行时主题' : '亮色运行时主题'
  const classSize = useMemo(() => btnClass.length + cardClass.length, [btnClass, cardClass])
  const runtimeCosts = [
    { label: 'SSR 注水', value: `${hydrationSize}KB`, desc: 'emotion cache + 已生成样式必须附带到 HTML' },
    { label: '哈希类名', value: 'devtools 依赖 source map', desc: '覆盖链需要 Debug 视图辅助' },
    { label: 'HMR/缓存', value: '需要 emotion cache 复用', desc: '否则 style 标签会频繁增删' },
  ]
  const pipeline = [
    '定义 theme tokens（颜色/阴影） -> props 读取。',
    '为组件暴露变体 props，拆出 shared hooks 生成 className。',
    '生产模式使用 babel 插件/提取 Critical CSS，减少注水。',
  ]
  const dxSignals = [
    { label: '类型提示', value: 'css prop / styled 具备 TS 提示' },
    { label: 'Tree Shaking', value: '依赖 babel 插件（@emotion/babel-plugin）' },
    { label: '缓存策略', value: 'Emotion cache key 需与 SSR 对齐' },
  ]

  return (
    <main className="page">
      <header className={heroShell}>
        <div className={metaRow}>
          <span className={cx(pill, pillAccent)}>2017 · CSS-in-JS (Emotion/SC)</span>
          <span className={cx(pill, pillGhost)}>组件隔离</span>
          <span className={cx(pill, pillGhost)}>props 驱动样式</span>
        </div>
        <h1 style={{ margin: 0, fontSize: '30px' }}>组件边界天然隔离，主题/状态直连样式</h1>
        <p style={{ margin: 0, color: palette.subtle }}>
          Emotion 运行时生成 class 并注入
          {' '}
          <code>&lt;style&gt;</code>
          ，主题切换与 props 状态天然绑定；同时要关注 SSR 注水、缓存与 devtools 可读性。
        </p>
        <div className={metaRow}>
          <button className={btnClass} type="button" onClick={() => setMode(prev => (prev === 'dark' ? 'light' : 'dark'))}>
            切换为
            {' '}
            {mode === 'dark' ? '亮色' : '暗色'}
          </button>
          <label className={tag}>
            <input checked={animatedBorder} type="checkbox" onChange={event => setAnimatedBorder(event.target.checked)} />
            props 决定边框/阴影
          </label>
          <label className={tag}>
            <input
              min={40}
              max={120}
              type="range"
              value={hydrationSize}
              onChange={event => setHydrationSize(Number(event.target.value))}
            />
            注水体积（KB）
          </label>
        </div>
        <p className={runtimeNote}>
          当前主题：
          {modeLabel}
          ；生成的 class 长度 ~
          {classSize}
          {' '}
          字符；SSR 注水体积 ~
          {hydrationSize}
          KB。
        </p>
      </header>

      <div className={gridTwo}>
        <section className={cardClass}>
          <div className={cx(pill, pillAccent)}>
            <span className="icon">⚡️</span>
            动态主题（Emotion）
          </div>
          <div className={sectionHeading}>
            <h2 style={{ margin: 0 }}>用 props/状态驱动样式</h2>
            <p style={{ color: palette.subtle, margin: 0 }}>按钮、卡片、阴影都由响应式状态生成，组件边界即作用域。</p>
          </div>
          <div className={metaRow}>
            <button className={btnClass} type="button" onClick={() => setMode(prev => (prev === 'dark' ? 'light' : 'dark'))}>
              切换为
              {' '}
              {mode === 'dark' ? '亮色' : '暗色'}
            </button>
            <span className={tag}>className 由 props 拼出</span>
            <span className={tag}>同组件支持多变体</span>
          </div>
          <div className={note}>
            <strong>工程化拆分：</strong>
            <ul style={{ margin: '6px 0 0 16px', color: palette.subtle, display: 'grid', gap: '4px' }}>
              {pipeline.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className={codeBox}>
            const button = css`padding: 10px; background: theme.accent;` →
            {' '}
            <span style={{ color: themes[mode].accent }}>className</span>
            {' '}
            随主题切换重新生成。
          </div>
        </section>

        <section className={cx(cardClass, warningBox)}>
          <div className={pill}>
            <span className="icon">⚠️</span>
            运行时成本
          </div>
          <h2 style={{ margin: '4px 0 0' }}>首屏注水 &amp; 可读性</h2>
          <div style={{ display: 'grid', gap: '8px' }}>
            {runtimeCosts.map(item => (
              <div key={item.label} className={metricRow}>
                <div className={metricLabel}>
                  <span>{item.label}</span>
                  <small style={{ color: palette.subtle }}>{item.desc}</small>
                </div>
                <span className={metricValue}>{item.value}</span>
              </div>
            ))}
          </div>
          <p className={runtimeNote}>类名是哈希，排查覆盖链需要 devtools / 标记辅助。</p>
        </section>

        <section className={cardClass}>
          <div className={ribbon}>工程化拆分</div>
          <h2 style={{ margin: '6px 0 0' }}>主题、变体、生产优化</h2>
          <ul style={{ margin: '8px 0 0 16px', color: palette.subtle, display: 'grid', gap: '6px' }}>
            <li>ThemeProvider / emotion cache 注入，组件直接消费 tokens。</li>
            <li>变体通过 props + 条件 className，避开 BEM 样式冲突。</li>
            <li>生产模式开启 @emotion/babel-plugin，移除 dev 代码并抽离关键 CSS。</li>
          </ul>
          <p className={runtimeNote}>比 BEM 更隔离，但要为 SSR 注水与缓存策略设计好基建。</p>
        </section>

        <section className={cardClass}>
          <div className={pill}>DX 快照</div>
          <h2 style={{ margin: '4px 0 0' }}>类型/Tree Shaking/缓存</h2>
          <div style={{ display: 'grid', gap: '6px', marginTop: '6px' }}>
            {dxSignals.map(signal => (
              <div key={signal.label} className={metricRow}>
                <div className={metricLabel}>
                  <span>{signal.label}</span>
                  <small style={{ color: palette.subtle }}>{signal.value}</small>
                </div>
                <span className={metricValue}>OK</span>
              </div>
            ))}
          </div>
          <p className={runtimeNote}>Dev 提示与生产优化通常由 Babel/Vite 插件和 cache 配置兜底。</p>
        </section>
      </div>

      <section className={cardClass}>
        <div className={sectionHeading}>
          <h2 style={{ margin: 0 }}>更多 CSS-in-JS 侧重点</h2>
          <p style={{ margin: 0, color: palette.subtle }}>每个方案在运行时/编译期的取舍不同：有的零运行时，有的强调原子化。</p>
        </div>
        <div className={featureGrid}>
          <StyledComponentsCard />
          <StyledJsxCard />
          <StylexCard />
          <VanillaExtractCard />
        </div>
      </section>
    </main>
  )
}

export default App
