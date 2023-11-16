const { execSync } = require('node:child_process');

module.exports = () => {
  execSync('npm unlink @code-pushup/eslint-config');
};
