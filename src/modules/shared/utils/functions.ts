export function debounce<F extends Function>(callback: F, waitFor: number, immediate = false) {
  let timeout: NodeJS.Timeout

  return function inner(...params: unknown[]) {
    const callNow = immediate && !timeout
    const next = () => callback(...params)

    clearTimeout(timeout)
    timeout = setTimeout(next, waitFor)

    if (callNow) {
      next()
    }
  }
}

export function set() {
  // TODO: not implemented
}
