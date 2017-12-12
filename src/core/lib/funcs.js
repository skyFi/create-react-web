/* eslint import/no-dynamic-require:0 */

// require newest file
export const reload = (requiredModulePath) => {
  const resolved = require.resolve(requiredModulePath);
  const cache = require.cache[resolved];
  delete require.cache[resolved];
  try {
    return require(requiredModulePath);
  } catch (err) {
    console.error('Error occurred while reloading module, rollback to cached one.\n =>', err.stack || err);
    require.cache[resolved] = cache || (() => {});
    return require(requiredModulePath);
  }
};
