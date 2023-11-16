/**
 * Checks if package is available
 * @param {string} name name of the package
 * @returns {boolean}
 */
function packageExists(name) {
  try {
    require.resolve(name);
    return true;
  } catch {
    return false;
  }
}

module.exports = {
  packageExists,
};
