import { Buffer } from 'node:buffer'
import { spawn } from 'node:child_process'
import fs from 'node:fs'
import net from 'node:net'
import path from 'node:path'
import process from 'node:process'

const stacks = [
  { name: 'vue', root: 'apps/vue', basePort: 4301, color: 36 },
  { name: 'react', root: 'apps/react', basePort: 4401, color: 35 },
]

const children = new Map()
const useColor = process.stdout.isTTY && !process.env.NO_COLOR

function color(text, code) {
  return useColor ? `\u001B[${code}m${text}\u001B[0m` : text
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'))
}

function discoverApps() {
  const apps = []

  for (const stack of stacks) {
    let nextPort = stack.basePort
    const entries = fs.readdirSync(stack.root, { withFileTypes: true }).filter(entry => entry.isDirectory())

    for (const entry of entries) {
      const pkgPath = path.join(stack.root, entry.name, 'package.json')
      const pkg = readJson(pkgPath)
      const portMatch = pkg.scripts?.dev?.match(/--port\s+(\d+)/)
      const port = portMatch ? Number.parseInt(portMatch[1], 10) : nextPort++

      apps.push({
        label: `${stack.name}/${entry.name}`,
        filter: pkg.name,
        path: `${stack.root}/${entry.name}`,
        port,
        color: stack.color,
      })
    }
  }

  return apps
}

function log(label, chunk, stream = 'stdout', code = null) {
  const text = chunk instanceof Buffer ? chunk.toString() : String(chunk)
  const lines = text.split('\n')

  for (const line of lines) {
    if (line.trim() === '') {
      continue
    }
    const prefix = color(`[${label}]`, code ?? 90)
    const output = `${prefix} ${line}\n`
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

    child.stdout?.on('data', data => log(app.label, data, 'stdout', app.color))
    child.stderr?.on('data', data => log(app.label, data, 'stderr', 31))

    child.on('exit', (code) => {
      if (code !== null && code !== 0) {
        log(app.label, `退出，状态码 ${code}`, 'stderr', 31)
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

function printSummary(apps) {
  const summary = apps
    .map(app => `${color(`- ${app.label}`, app.color)} (${app.path}) -> http://localhost:${app.port}`)
    .join('\n')

  process.stdout.write('\n所有 dev server 已就绪：\n')
  process.stdout.write(`${summary}\n`)
  process.stdout.write('\n按 Ctrl+C 停止所有服务。\n')
}

async function run() {
  const apps = discoverApps()

  process.stdout.write('启动 Vue/React 示例（带端口绑定与 --host）...\n')

  try {
    const ready = await Promise.all(apps.map(app => startApp(app)))
    const readyLabels = ready.map(item => item.label).join(', ')
    process.stdout.write(`${color('已检测到端口就绪', 32)}：${readyLabels}\n`)
    printSummary(apps)
  }
  catch (err) {
    const message = err?.message || String(err)
    log('dev', `启动失败：${message}`, 'stderr', 31)
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
