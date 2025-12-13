import { Buffer } from 'node:buffer'
import { spawn } from 'node:child_process'
import net from 'node:net'
import process from 'node:process'

const apps = [
  { label: 'vue/css-in-js', filter: 'css-in-js-vue', path: 'apps/vue/css-in-js', port: 4301 },
  { label: 'vue/css-modules', filter: 'css-modules-demo', path: 'apps/vue/css-modules', port: 4302 },
  { label: 'vue/headless-tokens', filter: 'headless-tokens', path: 'apps/vue/headless-tokens', port: 4303 },
  { label: 'vue/preprocessors-sass', filter: 'preprocessors-sass', path: 'apps/vue/preprocessors-sass', port: 4304 },
  { label: 'vue/raw-css-bem', filter: 'raw-css-bem', path: 'apps/vue/raw-css-bem', port: 4305 },
  { label: 'vue/utility-first', filter: 'utility-first-vue', path: 'apps/vue/utility-first', port: 4306 },
  { label: 'react/css-in-js', filter: 'css-in-js-react', path: 'apps/react/css-in-js', port: 4401 },
  { label: 'react/css-modules', filter: 'css-modules-react', path: 'apps/react/css-modules', port: 4402 },
  { label: 'react/headless-tokens', filter: 'headless-tokens-react', path: 'apps/react/headless-tokens', port: 4403 },
  { label: 'react/preprocessors-sass', filter: 'preprocessors-sass-react', path: 'apps/react/preprocessors-sass', port: 4404 },
  { label: 'react/raw-css-bem', filter: 'raw-css-bem-react', path: 'apps/react/raw-css-bem', port: 4405 },
  { label: 'react/utility-first', filter: 'utility-first-react', path: 'apps/react/utility-first', port: 4406 },
]

const children = new Map()

function log(label, chunk, stream = 'stdout') {
  const text = chunk instanceof Buffer ? chunk.toString() : String(chunk)
  const lines = text.split('\n')

  for (const line of lines) {
    if (line.trim() === '') {
      continue
    }
    const output = `[${label}] ${line}\n`
    if (stream === 'stderr') {
      process.stderr.write(output)
    }
    else {
      process.stdout.write(output)
    }
  }
}

function waitForPort(port, host = '127.0.0.1', retries = 120, delay = 500) {
  return new Promise((resolve, reject) => {
    function attempt(left) {
      const socket = net.createConnection({ host, port }, () => {
        socket.end()
        resolve(true)
      })

      socket.on('error', () => {
        socket.destroy()
        if (left <= 0) {
          reject(new Error(`端口 ${port} 在超时内未就绪`))
        }
        else {
          setTimeout(() => attempt(left - 1), delay)
        }
      })
    }

    attempt(retries)
  })
}

function startApp(app) {
  return new Promise((resolve, reject) => {
    const child = spawn('pnpm', ['--filter', app.filter, 'dev'], {
      cwd: process.cwd(),
      stdio: ['inherit', 'pipe', 'pipe'],
      env: { ...process.env },
    })

    children.set(app.label, child)

    child.stdout?.on('data', data => log(app.label, data))
    child.stderr?.on('data', data => log(app.label, data, 'stderr'))

    child.on('exit', (code) => {
      if (code !== null && code !== 0) {
        log(app.label, `退出，状态码 ${code}`)
      }
      children.delete(app.label)
    })

    waitForPort(app.port)
      .then(() => resolve(app))
      .catch((error) => {
        const wrapped = new Error(`启动 ${app.label} 失败：${error.message ?? error}`)
        wrapped.cause = error
        reject(wrapped)
      })
  })
}

function stopAll() {
  for (const child of children.values()) {
    child.kill('SIGINT')
  }
}

function printSummary() {
  const summary = apps.map(app => `- ${app.label} (${app.path}) -> http://localhost:${app.port}`).join('\n')

  process.stdout.write('\n所有 dev server 已就绪：\n')
  process.stdout.write(`${summary}\n`)
  process.stdout.write('\n按 Ctrl+C 停止所有服务。\n')
}

async function run() {
  process.stdout.write('启动 Vue/React 示例（带端口绑定与 --host）...\n')

  try {
    const ready = await Promise.all(apps.map(app => startApp(app)))
    const readyLabels = ready.map(item => item.label).join(', ')
    process.stdout.write(`已检测到端口就绪：${readyLabels}\n`)
    printSummary()
  }
  catch (err) {
    const message = err?.message || String(err)
    log('dev', `启动失败：${message}`, 'stderr')
    stopAll()
    process.exit(1)
  }
}

process.on('SIGINT', () => {
  process.stdout.write('\n收到退出信号，正在停止 dev servers...\n')
  stopAll()
  process.exit(0)
})

process.on('SIGTERM', () => {
  process.stdout.write('\n收到退出信号，正在停止 dev servers...\n')
  stopAll()
  process.exit(0)
})

run()
