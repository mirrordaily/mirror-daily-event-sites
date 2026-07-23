import {
  useState,
  useEffect,
  createContext,
  PropsWithChildren,
  useContext,
} from 'react'

const initialValue: {
  YoutubePlayer?: typeof YT.Player
} = {}

const YoutubePlayerContext = createContext(initialValue)

export function YoutubePlayerProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState<typeof initialValue>({
    YoutubePlayer:
      typeof window === 'undefined' ? undefined : window?.YT?.Player,
  })

  useEffect(() => {
    if (state.YoutubePlayer) return

    if (window.YT && window.YT.Player) {
      setState({ YoutubePlayer: window.YT.Player })
      return
    }

    const existingScript = document.querySelector(
      'script[src="https://www.youtube.com/iframe_api"]'
    )
    if (!existingScript) {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      const firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag)
    }

    const previousCallback = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      if (previousCallback) previousCallback()
      if (window.YT && window.YT.Player) {
        setState({ YoutubePlayer: window.YT.Player })
      }
    }

    return () => {
      window.onYouTubeIframeAPIReady = previousCallback
    }
  }, [state.YoutubePlayer])
  return (
    <YoutubePlayerContext.Provider value={state}>
      {children}
    </YoutubePlayerContext.Provider>
  )
}

export function useYoutubePlayer() {
  return useContext(YoutubePlayerContext)
}
