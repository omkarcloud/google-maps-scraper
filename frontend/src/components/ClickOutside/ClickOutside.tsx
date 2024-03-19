import React from 'react'
import ReactDOM from 'react-dom'
export const UnreachableError = new Error('REACHED AN UNREACHABLE STATEMENT')

export function closest(
  el: HTMLElement | null,
  check: (el: HTMLElement) => boolean
): HTMLElement | undefined {
  let x: HTMLElement | null = el

  while (x) {
    if (check(x)) return x
    x = x.parentElement
  }
  return undefined
}

export const instances: React.Component[] = []
type Func1<T1, R> = (a1: T1) => R

type Props = {
  exceptions?: (string | Func1<MouseEvent, boolean>)[]
  handleClickOutside: Func1<MouseEvent, void>
}

export const IGNORE_CLICK = true
export default class ClickOutside extends React.Component<Props | any> {
  // eslint-disable-next-line react/static-property-placement
  static defaultProps = {
    exceptions: [],
  }

  componentDidMount() {
    if (instances.length === 0) {
      document.addEventListener('mousedown', this.handleAll, true)
    }
    instances.push(this)
  }

  componentWillUnmount() {
    instances.splice(instances.indexOf(this), 1)
    if (instances.length === 0) {
      document.removeEventListener('mousedown', this.handleAll, true)
    }
  }

  handleAll = (e: MouseEvent) => {
    const target: HTMLElement = e.target as HTMLElement
    if (!target) return

    instances.forEach(instance => {
      const { exceptions, handleClickOutside: onClickOutside } =
        instance.props as Required<Props>
      let exceptionsCount = 0

      if (exceptions.length > 0) {
        const { functionExceptions, stringExceptions } = exceptions.reduce(
          (acc, exception) => {
            switch (typeof exception) {
              case 'function':
                acc.functionExceptions.push(exception)
                break
              case 'string':
                acc.stringExceptions.push(exception)
                break
              default:
                throw UnreachableError
            }

            return acc
          },
          {
            functionExceptions: [] as Func1<MouseEvent, boolean>[],
            stringExceptions: [] as string[],
          }
        )
        if (functionExceptions.length > 0) {
          exceptionsCount += functionExceptions.filter(
            exception => exception(e) === true
          ).length
        }

        if (exceptionsCount === 0 && stringExceptions.length > 0) {
          const el = closest(target, node =>
            stringExceptions.some(ex => node.classList.contains(ex))
          )
          if (el) {
            exceptionsCount += 1
          }
        }
      }

      if (exceptionsCount === 0) {
        // eslint-disable-next-line react/no-find-dom-node
        const node = ReactDOM.findDOMNode(instance)

        if (node && !node.contains(target)) {
          onClickOutside(e)
        }
      }
    })
  }

  render() {
    const { children } = this.props as any
    return React.Children.only(children)
  }
}
