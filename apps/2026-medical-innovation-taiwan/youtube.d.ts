declare namespace YT {
  class Player {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(elementId: string | HTMLElement, options: any)
  }
}

interface Window {
  onYouTubeIframeAPIReady?: () => void
  YT: typeof YT
}
