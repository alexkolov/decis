export function Result(status, payload) {
  return { status, payload }
}

export function SuccessResult(payload) {
  return Result('success', payload)
}

export function ErrorResult(payload) {
  return Result('error', payload)
}