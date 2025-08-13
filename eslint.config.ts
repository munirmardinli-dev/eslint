import createEslintConfig from './config/index.js';

export default createEslintConfig({
  files: ['src/**/*.ts', 'src/**/*.tsx'],
  ignores: ['dist/', 'build/'],
  tsProject: ['./tsconfig.json'],
  yamlProjects: ['./tsconfig.json'],
});