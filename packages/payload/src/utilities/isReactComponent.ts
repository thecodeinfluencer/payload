import type React from 'react'

const clientRefSymbol = Symbol.for('react.client.reference')

export function isReactServerComponentOrFunction<T extends any>(
  component: React.ComponentType | any,
): component is T {
  if (component === null || component === undefined) {
    return false
  }
  const hasClientComponentSymbol = component.$$typeof == clientRefSymbol

  const isFunctionalComponent = typeof component === 'function'
  // Anonymous functions are Client Components in Turbopack. RSCs should have a name
  const isAnonymousFunction = typeof component === 'function' && component.name === ''

  const isRSC = isFunctionalComponent && !isAnonymousFunction && !hasClientComponentSymbol

  return isRSC
}

export function isReactClientComponent<T extends any>(
  component: React.ComponentType | any,
): component is T {
  if (component === null || component === undefined) {
    return false
  }
  return !isReactServerComponentOrFunction(component)
}

export function isReactComponentOrFunction<T extends any>(
  component: React.ComponentType | any,
): component is T {
  return isReactServerComponentOrFunction(component) || isReactClientComponent(component)
}
