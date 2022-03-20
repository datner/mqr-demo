import { ItemWithImage } from 'entities/menu-item';
import { animated, useSpring } from '@react-spring/web';
import Image from 'next/image';
import { useDrag } from '@use-gesture/react';
import { useRef } from 'react';

type Props = {
  item: ItemWithImage;
};

export function MenuItem(props: Props) {
  const { item } = props;
  const { x, opacity } = useSpring({ x: 0, opacity: 0 });
  const ref = useRef<HTMLDivElement>(null);
  const bind = useDrag(
    ({ active, distance: [dx], swipe: [sx], movement: [mx] }) => {
      const width = ref.current?.getBoundingClientRect().width ?? Infinity;
      const trigger = sx !== 0 || dx > width / 2;
      const fromThird = mx - width / 3;
      if (!active && trigger) console.log('yeet');
      active && mx > 0 ? x.set(mx) : x.start(0);
      active && fromThird > 0
        ? opacity.set(fromThird / (width / 2))
        : opacity.start(0);
    }
  );

  return (
    <animated.li className="col-span-1 px-2 relative overflow-hidden">
      <animated.div
        style={{ opacity }}
        className="bg-gradient-to-r pl-2 shadow-2xl from-lime-200 to-green-600 flex items-center absolute inset-0"
      >
        <span className="text-2xl text-green-900">Give me!</span>
      </animated.div>
      <animated.div
        style={{ x }}
        ref={ref}
        {...bind()}
        className="flex-1 flex relative object-fill touch-none bg-white rounded-lg overflow-hidden shadow"
      >
        <dl className="z-10 p-3 flex-grow flex flex-col">
          <dt className="sr-only">Name</dt>
          <dd className="text-gray-800 text-base">{item.name}</dd>
          <dt className="sr-only">Description</dt>
          <dd className="text-gray-500 text-sm">{item.description}</dd>
          <dt className="sr-only">Price</dt>
          <dd className="mt-3">
            <span className="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">
              {item.price} ₪
            </span>
          </dd>
        </dl>
        <div className="h-28 relative w-56 flex-shrink-0 translate-x-1/4">
          <Image
            layout="fill"
            src={item.image.publicUrlTransformed}
            alt={item.name}
          />
          <div className="absolute inset-y-0 -left-px right-1/2 bg-gradient-to-r from-white" />
        </div>
      </animated.div>
    </animated.li>
  );
}
