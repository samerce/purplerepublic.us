export const TogglePastTimeline = 'timeline.past.toggle'
export const ToggleFutureTimeline = 'timeline.future.toggle'

export function togglePastTimeline() {
  return {
    type: TogglePastTimeline,
  }
}

export function toggleFutureTimeline() {
  return {
    type: ToggleFutureTimeline,
  }
}
