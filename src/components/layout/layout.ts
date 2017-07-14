import h from 'inferno-hyperscript'

import { layout, main } from 'hn-styles/lib/layout/layout'

import Header from './header'

export default ({ children }) => {
    return h(`.${layout}`, [h(Header), h(`.${main}`, [children])])
}
