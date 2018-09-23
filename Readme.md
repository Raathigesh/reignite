## 🍬 Config Pack

Config pack is a UI based configuration generator for JavaScript projects.

The idea is to provide UI blocks which configures various tools for JavaScript projects.

Each block will be developed independently and should compose together. Each block would manipulate the webpack config AST using [babel-standalone](https://babeljs.io/docs/en/next/babel-standalone.html) and pass it to the next block in the pipeline. Finally the config would be shown in the editor panel.

Each block would also expose it's own UI with various controls which allows to tweak the resulting webpack config.

The tool should produce the following as the result

- A webpack config
- A package.json

Inspired by [webpack blocks](https://github.com/andywer/webpack-blocks).

## Scripts

- `ui`: Starts the webpack dev server and serves the UI
- `build-ui`: Builds the UI project
- `debug`: Runs the node server via nodemon in watch mode
- `build-server`: Builds the node server
- `prod`: Builds both the UI and the server
