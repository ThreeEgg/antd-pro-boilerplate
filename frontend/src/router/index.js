import {
  Home,
} from '@/views';

import Demo from '@/views/Demo'
import Todo from '@/views/Todo'

const routes = [

  {
    name: '拨打策略',
    path: '/',
    component: Home,
  },
  {
    name: 'Demo',
    path: '/Demo',
    component: Demo,
  },
  {
    name: 'Todo',
    path: '/Todo',
    component: Todo,
  },
]

export default routes;
