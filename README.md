# @munirmardinli/eslint

A flexible and modern ESLint configuration for TypeScript, JavaScript, React, YAML, and JSON projects.  
Created by Munir Mardinli.

## Features

- Opinionated and extendable ESLint rules
- TypeScript, JavaScript, React, YAML, and JSON support
- Prettier integration
- Security, import, filenames, and code quality plugins included
- Easy to use in any project

## Installation

```sh
npm install --save-dev @munirmardinli-dev/eslint
# or
yarn add --dev @munirmardinli-dev/eslint
```

> **Note:**  
> You must also install all listed `peerDependencies` in your project.

## Usage

Create an `eslint.config.ts` (or `.js`) in your project root:

```typescript
import createEslintConfig from '@munirmardinli-dev/eslint';

export default createEslintConfig({
  files: ['src/**/*.ts', 'src/**/*.tsx'],
  ignores: ['dist/', 'build/'],
  tsProject: ['./tsconfig.json'],
  yamlProjects: ['./tsconfig.json'],
});
```

## Options

| Option        | Type                | Description                                      |
| ------------- | ------------------- | ------------------------------------------------ |
| `files`       | `string[]`          | File patterns to lint                            |
| `ignores`     | `string[]`          | File/folder patterns to ignore                   |
| `tsProject`   | `string \| string[]`| Path(s) to your TypeScript config(s)             |
| `yamlProjects`| `string[]`          | Path(s) to your YAML TypeScript config(s)        |

## Example

```typescript
import createEslintConfig from '@munirmardinli-dev/eslint';

export default createEslintConfig({
  files: ['src/**/*.ts', 'src/**/*.tsx'],
  ignores: ['dist/', 'build/'],
  tsProject: ['./tsconfig.json'],
  yamlProjects: ['./tsconfig.json'],
});
```

## License

MIT

# install new version

```bash
npm config get registry
npm cache clean --force
npm install
```