import { createApp } from './app';

const { app, router, store, apolloClient } = createApp()

if (window.__INITIAL_STATE__) {
    store.replaceStore(window.__INITIAL_STATE__))
}

router.onReady(()=>{
    router.beforeResolve((to, from, next)=>{
        const matched = router.getMatchedComponents(to)
        const prevMatched = router.getMatchedComponents(from)

        let diff = false
        const activated = matched.filter((c, i)=>{
            return diff || (diff = (prevMatched[i] !== c))
        })

        if(!activated.length) {
            return next()
        }

        Promise.all(activated.map((c)=>{
            if (c.asyncData) {
                return c.asyncData({store, route: to, apolloClient})
            }
        })).then(()=>next()).catch(next)
    })

    app.$mount('#app', true)
})
