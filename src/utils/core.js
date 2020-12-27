export function noop() {
  return { status: 'noop' }
}

export function partial(fn, ...args) {
  return (..._args) => fn.apply(null, [...args, ..._args])
}

export function withPrompt(
  question,
  defaultAnswer = '',
  onCancel = noop,
  onInputSuccess = noop,
  onInputError = noop,
) {
  return () => {
    const input = prompt(question, defaultAnswer)

    const isCanceled = input === null
    if (isCanceled) {
      return onCancel.call(null)
    }

    if (input) {
      return onInputSuccess.call(null, input)
    } else {
      return onInputError.call(null)
    }
  }
}
