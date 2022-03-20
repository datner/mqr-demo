import { config, list } from '@keystone-6/core';
import { text, integer, relationship } from '@keystone-6/core/fields';
import { cloudinaryImage } from '@keystone-6/cloudinary';

export default config({
  lists: {
    Restaurant: list({
      fields: {
        name: text({ validation: { isRequired: true } }),
        slug: text({ isIndexed: 'unique', isFilterable: true }),
        menus: relationship({ ref: 'Menu', many: true }),
        image: cloudinaryImage({
          cloudinary: {
            cloudName: 'datner',
            apiKey: '267696873922652',
            apiSecret: '4ZKfenNhM32U3NZnbAEkQBXt8XM',
            folder: 'menus/logos',
          },
        }),
      },
    }),
    Menu: list({
      fields: {
        title: text({ validation: { isRequired: true } }),
        slug: text({ isIndexed: 'unique', isFilterable: true }),
        description: text({ ui: { displayMode: 'textarea' } }),
        items: relationship({ ref: 'MenuItem', many: true }),
      },
    }),
    MenuItem: list({
      fields: {
        name: text({ validation: { isRequired: true } }),
        description: text({
          ui: { displayMode: 'textarea' },
          defaultValue: '',
        }),
        price: integer({ validation: { isRequired: true } }),
        image: cloudinaryImage({
          cloudinary: {
            cloudName: 'datner',
            apiKey: '267696873922652',
            apiSecret: '4ZKfenNhM32U3NZnbAEkQBXt8XM',
            folder: 'menus/items',
          },
        }),
      },
    }),
  },
  db: {
    provider: 'postgresql',
    url: 'postgres://datner:1881234@localhost:5432/keystone',
    // Optional advanced configuration
    enableLogging: true,
    useMigrations: true,
    idField: { kind: 'uuid' },
  },
  experimental: {
    generateNodeAPI: true,
    generateNextGraphqlAPI: true,
  },
});
