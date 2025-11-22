import { defineConfig } from 'orval';

export default defineConfig({
  api: {
    input: '../api/swagger.json',
    output: {
      mode: 'tags-split',
      target: 'src/features/api',
      schemas: 'src/features/api/model',
      client: 'react-query',
      mock: false,
      override: {
        mutator: {
          path: 'src/lib/axios.ts',
          name: 'customInstance',
        },
      },
    },
  },
});

