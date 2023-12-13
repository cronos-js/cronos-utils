# CHANGELOG

Return to [README.md](../../README.md)

## [0.1.11] - 13/12/2023

### Fix

- Fixed [cronos-watch](./src/cronos-watch/src/index.js) so that when using the frontend API (port) it now has priority and updating the rspack.config.js file.

## [0.1.10] - 12/12/2023

### Add

- [Vue](https://vuejs.org/) support is now available.

- [CHANGELOG.md](CHANGELOG.md) file was included to keep track of the changes made in each version of the project.

- The [README.md](README.md) file was updated to include the CHANGELOG section, the LICENSE section and the Language section.

- [EsLint](https://eslint.org/) and [Prettier](https://prettier.io/) were added to the project to improve the code.

### Update

- An improvement is added to the port configuration in the rspack.config.js file when configured via the cronos-utils API.

- Now there is a single root and version of the project, which reduces it to a single [package.json](package.json) file.
