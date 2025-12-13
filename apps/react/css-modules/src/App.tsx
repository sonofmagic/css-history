import { ScopedCard } from './components/ScopedCard'
import inlineStyles from './inline-section.module.css'
import './App.css'

const modulePoints = [
  '编译期生成哈希类名，默认隔离作用域',
  '可以组合：局部类 + props 决定组件状态',
  'Card 样式随组件走，发布 npm 也不怕污染宿主',
]

const drawbacks = [
  '跨组件复用要抽 hooks 或 shared 样式文件',
  '设计 token 不在 CSS Modules 里，需要额外抽离',
  '类名哈希后可读性下降，调试需借助 source map',
]

const inlineClasses = inlineStyles

function App() {
  return (
    <main className="page">
      <section className="hero">
        <p className="eyebrow">2015 · CSS Modules 阶段</p>
        <h1 className="hero-title">类名编译哈希化，作用域终于隔离</h1>
        <p className="hero-desc">
          CSS Modules 把样式与组件绑定，
          <code>card__title</code>
          {' '}
          会编译成哈希，避免全局污染；同时也让跨组件的 token/主题需要新的抽象层。
        </p>
      </section>

      <section className="grid">
        <ScopedCard eyebrow="优势：隔离" title="类名本地化，组件可发布" points={modulePoints}>
          <p className="chip">card__title → card__title___3z5s8</p>
          <p className="tiny">（示例哈希，提醒调试时要看 source map）</p>
        </ScopedCard>

        <ScopedCard eyebrow="弊端：跨组件难复用" title="tokens/主题需额外管线" points={drawbacks} elevated={false}>
          <div className="note">
            <strong>例子：</strong>
            {' '}
            设计团队调了品牌色，组件内的
            <code>--brand</code>
            {' '}
            变量并不知道；需要在构建层把 tokens 注入，或另建全局变量文件。
          </div>
        </ScopedCard>
      </section>

      <section className={inlineClasses.card}>
        <div className={inlineClasses.badge}>SFC &lt;style module&gt;</div>
        <h2 className={inlineClasses.title}>在单文件里直接使用 $style</h2>
        <p className={inlineClasses.desc}>
          Vue SFC 的
          {' '}
          <code>&lt;style module&gt;</code>
          {' '}
          会把类名编译成哈希并注入当前组件，模板里通过
          {' '}
          <code>$style</code>
          {' '}
          或
          <code>useCssModule</code>
          {' '}
          引用，避免全局污染。
        </p>
        <ul className={inlineClasses.list}>
          <li>无需单独 .module.css，局部示例可内联。</li>
          <li>类名依旧本地化，避免与外部冲突。</li>
          <li>适合 demo/小片段，减少额外文件拆分。</li>
        </ul>
        <div className={inlineClasses.actions}>
          <button className={inlineClasses.button} type="button">
            模块化按钮
          </button>
          <span className={inlineClasses.muted}>
            真实类名：
            {inlineClasses.button}
          </span>
        </div>
      </section>
    </main>
  )
}

export default App
