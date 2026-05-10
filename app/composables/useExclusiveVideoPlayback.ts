type PauseHandler = () => void

const pauseHandlers = new Map<string, PauseHandler>()
let currentControllerId: string | null = null

/**
 * Ensures only one video plays at a time across the page.
 * Each player instance calls `registerExternalPause` with a handler that pauses its `<video>`.
 */
export function useExclusiveVideoPlayback() {
  const controllerId = useId()

  function registerExternalPause(handler: PauseHandler) {
    pauseHandlers.set(controllerId, handler)
    onScopeDispose(() => {
      pauseHandlers.delete(controllerId)
      if (currentControllerId === controllerId) {
        currentControllerId = null
      }
    })
  }

  /** Pause other players, then mark this one as active. Call immediately before `video.play()`. */
  function takePlaybackLock() {
    if (currentControllerId && currentControllerId !== controllerId) {
      pauseHandlers.get(currentControllerId)?.()
    }
    currentControllerId = controllerId
  }

  /** Call when this video pauses or stops so the lock can move to another player. */
  function releasePlaybackLock() {
    if (currentControllerId === controllerId) {
      currentControllerId = null
    }
  }

  return {
    controllerId,
    registerExternalPause,
    takePlaybackLock,
    releasePlaybackLock
  }
}
