/**
 * Import all modules defined in modules folder
 */
function importAllModules(): string[] {
  const context = require.context('../modules', true, /^\.\/.*\/index.ts$/)
  const keys = context.keys()

  keys.forEach((key) => context(key))
  return keys
}

const modules = importAllModules()

if (process.env.NODE_ENV !== 'production') {
  console.log('[MODULES LOADED]', modules)
}
