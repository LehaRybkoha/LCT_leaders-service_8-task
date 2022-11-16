import View from './view.vue'
import test_auth from '../_middleware/test-auth'

export default [
  {
    path: '/',
    name: 'Home',
    component: View,
    meta: {
      middlewares: [test_auth],
    },
  },
]
