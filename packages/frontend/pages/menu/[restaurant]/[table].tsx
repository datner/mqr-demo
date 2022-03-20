import { GetStaticPaths, GetStaticProps } from 'next';
import { query } from '.keystone/api';
import { z } from 'zod';
import { RestaurantWithMenusWithItems } from 'entities/restaurant';
import { MenuList } from 'components/MenuList';
import { MenuItem } from 'components/MenuItem';
import { invariant } from 'utils/invariant';

interface MenuProps {
  restaurant: RestaurantWithMenusWithItems;
}

type QueryParams = {
  restaurant: string;
  table: string;
};

export default function Table(props: MenuProps) {
  const { restaurant } = props;
  const { menus, name } = restaurant;
  const menu = menus.at(0);

  invariant(menu, 'Menu not found');

  return (
    <div>
      <h1>{name}</h1>
      <hr />
      <h2>{menu.title}</h2>
      <p>{menu.description}</p>
      <MenuList>
        {menu.items.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
      </MenuList>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths<QueryParams> = async () => {
  const JustSlug = z.object({ slug: z.string() });
  type JustSlug = z.infer<typeof JustSlug>;
  const restaurants = (await query.Restaurant.findMany({
    query: 'slug',
  })) as JustSlug[];

  await JustSlug.array().parseAsync(restaurants);

  return {
    fallback: 'blocking',
    paths: restaurants.map((restaurant) => ({
      params: { restaurant: restaurant.slug, table: '*' },
    })),
  };
};

export const getStaticProps: GetStaticProps<MenuProps, QueryParams> = async (
  context
) => {
  const slug = context.params?.restaurant;

  invariant(slug, 'restaurant slug is required');

  const restaurant = (await query.Restaurant.findOne({
    where: { slug },
    query: `
    id
    name
    menus {
        id
        title
        description
        items {
            id
            name
            description
            price
            image {
                id
                publicUrlTransformed(transformation: { height: "400", width: "800", crop: "fill" })
            }
        }
    }`,
  })) as RestaurantWithMenusWithItems;

  await RestaurantWithMenusWithItems.parseAsync(restaurant);

  return {
    props: {
      restaurant,
    },
  };
};
