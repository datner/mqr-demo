import { z } from 'zod';
import { Menu } from './menu';
import { ItemWithImage } from './menu-item';

export const Restaurant = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
});

export type Restaurant = z.infer<typeof Restaurant>;

export const RestaurantWithMenusWithItems = Restaurant.omit({
  slug: true,
}).extend({
  menus: Menu.omit({ slug: true })
    .extend({
      items: ItemWithImage.array(),
    })
    .array(),
});

export type RestaurantWithMenusWithItems = z.infer<
  typeof RestaurantWithMenusWithItems
>;
