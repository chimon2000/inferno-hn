import { render, version } from 'inferno'
import { Router } from 'inferno-router'
import h from 'inferno-hyperscript'
import createBrowserHistory from 'history/createBrowserHistory'

import routes from './routes'
const browserHistory = createBrowserHistory()

render(h(Router, { history: browserHistory }, [routes]), document.getElementById('app'))
