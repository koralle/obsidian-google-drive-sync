import { defineConfig } from 'orval';

export default defineConfig({
  'Obsidian Google Drive Sync': {
    input:  {
      // validation: true,
      target: './tsp-output/schema/openapi.yaml',
    },
    output: {
      mode: 'split',
      client: 'fetch',
      namingConvention: 'kebab-case',
      target: './output/endpoints',
      schemas: './output/model',
      fileExtension: '.gen.ts',
      indexFiles: true
    },
    hooks: {
      afterAllFilesWrite: 'biome check --fix'
    }
  },
});
