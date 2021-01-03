export function partial(fn, ...args) {
  return (..._args) => fn.apply(null, [...args, ..._args])
}

export function noop() {
  return { status: 'noop' }
}

export function asNoopFn(fn, ...args) {
  return () => {
    fn.apply(null, args)
    return noop()
  }
}

export function withConfirm(question, onSuccess = noop, onCancel = noop) {
  return () => {
    return window.confirm(question) ? onSuccess.call() : onCancel.call()
  }
}

function defaultInputValidator(input) {
  return !!input
}

export function withPrompt(
  question,
  defaultAnswer = '',
  onSuccess = noop,
  onCancel = noop,
  onError = noop,
  inputValidatorFn = defaultInputValidator
) {
  return () => {
    const input = window.prompt(question, defaultAnswer)

    const isCanceled = input === null
    if (isCanceled) {
      return onCancel.call()
    }

    if (inputValidatorFn(input)) {
      return onSuccess.call(null, input)
    } else {
      return onError.call()
    }
  }
}
