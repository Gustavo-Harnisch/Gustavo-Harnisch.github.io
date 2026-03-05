import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

const reactCompat = {
  rules: {
    'jsx-uses-vars': {
      meta: { type: 'problem', schema: [] },
      create(context) {
        const sourceCode = context.sourceCode ?? context.getSourceCode()

        const mark = (nameNode) => {
          if (!nameNode) return
          if (nameNode.type === 'JSXIdentifier') {
            sourceCode.markVariableAsUsed(nameNode.name, nameNode)
            return
          }
          if (nameNode.type === 'JSXMemberExpression') {
            mark(nameNode.object)
          }
        }

        return {
          JSXOpeningElement(node) {
            mark(node.name)
          }
        }
      }
    }
  }
}

export default [
  { ignores: ['dist', 'dist-ssr'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: { jsx: true }
      }
    },
    plugins: {
      'react-compat': reactCompat,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react-compat/jsx-uses-vars': 'error',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }]
    }
  }
]
