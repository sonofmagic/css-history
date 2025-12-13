declare module 'styled-components' {
  const styled: any
  export default styled
}

declare module 'styled-jsx/babel'

declare module '@stylexjs/stylex' {
  export function create<StyleMap extends Record<string, unknown>>(styles: StyleMap): StyleMap
  export function props(...styles: Array<Record<string, unknown>>): { className: string }
}

declare module '@vanilla-extract/css' {
  export function style(styleObject: Record<string, unknown>): string
}

declare module '@vanilla-extract/vite-plugin' {
  export function vanillaExtractPlugin(): unknown
}

declare namespace React {
  interface StyleHTMLAttributes<_T = unknown> {
    jsx?: boolean
  }
}
