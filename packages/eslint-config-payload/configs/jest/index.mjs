import jestRules from './rules/jest.mjs'
import jestDomRules from './rules/jest-dom.mjs'
import jestDom from 'eslint-plugin-jest-dom'
import jest from 'eslint-plugin-jest'
import { deepMerge } from '../../deepMerge.js'


/** @type {import('eslint').Linter.FlatConfig} */
export const index = deepMerge(
  jestRules,
  jestDomRules,
  {
    env: {
      jest: true,
    },
    plugins: {
      jest,
      'jest-dom': jestDom,
    },
  }
)

export default index
