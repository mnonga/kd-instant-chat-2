import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from "../store";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home_vue" */"../views/ListMembre"),
        meta: {title: "Liste des membres", mustLogin: false}
    },
    {
        path: '/membres/new',
        name: 'membres.new',
        component: () => import(/* webpackChunkName: "create_membres_vue" */"../views/CreateMembre"),
        meta: {title: "Nouveau membre", mustLogin: false}
    },
    {
        path: '/membres/stats',
        name: 'membres.stats',
        component: () => import(/* webpackChunkName: "stats_membres_vue" */"../views/StatMembre"),
        meta: {title: "Statistiques des membres", mustLogin: false}
    },
    // {
    //     path: '/*',
    //     name: '404',
    //     component: () => import(/* webpackChunkName: "404_vue" */"../views/404"),
    //     props: {title: "Page non trouvée",},
    //     meta: {title: "Page non trouvée", mustLogin: false}
    // },
]


const router = new VueRouter({
    routes,
    // mode: 'history'
})


import $eventHub from './eventHub'

router.beforeEach((to, from, next) => {
    // console.log("router.beforeEach", "to", to, "from", from)
    if (to.meta.title) document.title = `${to.meta.title} | ECIDE`
    if (typeof to.matched[0]?.components.default === 'function') {
        $eventHub.$emit('asyncComponentLoading', to) // Start progress bar
    }
    if(to.meta && to.meta.mustLogin && !store.state.user){
        if(from.name!=='Login'){
            router.replace({name:'Login', query:{ref:to.name}})
        }
        else{
            next(false)
            // remove the component loader
            $eventHub.$emit('asyncComponentLoaded')
        }
    }
    else next()
})


router.beforeResolve((to, from, next) => {
    $eventHub.$emit('asyncComponentLoaded') // Stop progress bar
    next()
})



export default router
