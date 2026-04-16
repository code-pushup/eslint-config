#!/usr/bin/env node

/**
 * CLI entry point.
 *
 * Kept as a separate file (instead of pointing `bin` at `src/cli.js`) because
 * TypeScript build output doesn't preserve file permissions. Tracking this
 * file in git with `+x` ensures the CLI stays executable after publish
 * without a post-install script.
 */
import './src/cli.js';
