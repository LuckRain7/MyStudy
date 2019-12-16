import Vue from 'vue'
// import VueRouter from './vue-router-myself'
// import VueRouter from 'vue-router'
import VueRouter from '@/vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/about',
        name: 'about',
        component: () =>
            import(/* webpackChunkName: "about" */ '../views/About.vue'),
        children: [
            {
                path: 'a',
                component: {
                    render(h) {
                        return <h1>about a</h1>
                    },
                },
            },
            {
                path: 'b',
                component: {
                    render(h) {
                        return <h1>about b</h1>
                    },
                },
            },
        ],
    },
]

const router = new VueRouter({
    mode:'hash',
    routes,
})

export default router
