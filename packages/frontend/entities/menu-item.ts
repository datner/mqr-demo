import { z } from 'zod';
import { CloudinaryImage } from './cloudinary-image';

export const MenuItem = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
});

export const ItemWithImage = MenuItem.extend({
  image: CloudinaryImage.pick({ id: true, publicUrlTransformed: true }),
});

export type ItemWithImage = z.infer<typeof ItemWithImage>;
export type MenuItem = z.infer<typeof MenuItem>;
