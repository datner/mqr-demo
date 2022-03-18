import { config } from '@keystone-6/core';

export default config({
  lists: {},
  db: {
    provider: 'postgresql',
    url: 'postgres://datner:1881234@localhost:5432/keystone',
    // Optional advanced configuration
    enableLogging: true,
    useMigrations: true,
    idField: { kind: 'uuid' },
  },
});
