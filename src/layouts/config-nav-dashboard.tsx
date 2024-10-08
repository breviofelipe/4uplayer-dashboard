import { Icon } from '@iconify/react';
import { Label } from 'src/components/label';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor width="100%" height="100%" src={`/assets/icons/navbar/${name}.svg`} />
);

export const navData = [
  {
    title: 'Dashboard',
    path: '/',
    icon: icon('ic-analytics'),
  },
  {
    title: 'Users',
    path: '/user',
    icon: icon('ic-user'),
  },
  {
    title: 'Transfers',
    path: '/transfers',
    icon: icon('ic-analytics'),
    info: (
      <Label color="success" variant="inverted">
        +1
      </Label>
    ),
  },
  {
    title: 'Product',
    path: '/products',
    icon: icon('ic-cart'),
    info: (
      <Label color="info" variant="inverted">
        +3
      </Label>
    ),
  },
  {
    title: 'Posts',
    path: '/blog',
    icon: <Icon icon="iconoir:post" width="24" height="24" />,
    info: (
      <Label color="info" variant="inverted">
        +7
      </Label>
    )
  }
];
