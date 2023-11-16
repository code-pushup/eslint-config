const { execSync } = require('node:child_process');

module.exports = () => {
  execSync('npm link');
  execSync('npm link @code-pushup/eslint-config');
};
