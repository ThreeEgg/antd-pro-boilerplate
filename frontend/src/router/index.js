import {
  Home, ForbidCallStrategy
} from '@/views';
const routes = [
  {
    name: '拨打策略',
    path: '/',
    component: Home,
  },
  {
    name: '禁止拨打策略',
    path: '/forbidCallStrategy',
    component: ForbidCallStrategy,
  }
]

export default routes;