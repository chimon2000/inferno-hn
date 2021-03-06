import Inferno from 'inferno'
import h from 'inferno-hyperscript'
import { Route, IndexRoute, Redirect } from 'inferno-router'
import createBrowserHistory from 'history/createBrowserHistory'
import Home from './views/home'
import About from './views/about'
import Stories from './views/stories'
import Layout from './components/layout/layout'

function App({ children }) {
    return h('div', [children])
}

function NoMatch() {
    return h('div', 'Yo mama')
}

const routes = h(Route, {
    component: Layout,
    children: [
        h(IndexRoute, { component: Home }),
        h(Route, { path: 'about', component: About }),
        h(Route, { path: 'stories/:category', component: Stories }),
        h(Route, { path: 'stories/:category/:page', component: Stories }),
        h(Route, { path: '*', component: NoMatch })
    ]
})

export default routes
