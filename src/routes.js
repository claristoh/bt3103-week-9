import Orders from './Orders.vue'
import PageContent from './components/PageContent.vue'
import Modify from './Modify.vue'
import Dashboard from './components/Dashboard.vue'

export default [
    {path: '/orders', component: Orders},
    {path: '/', component: PageContent},
    {path: '/modify', name: 'modify', component: Modify, props: true},
    {path: '/dashboard', component: Dashboard}
]