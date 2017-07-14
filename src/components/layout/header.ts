import h from 'inferno-hyperscript'
import { Link, IndexLink } from 'inferno-router'
import { classes } from 'typestyle'

import { header, nav, logoStyle, link, activeLink } from 'hn-styles/lib/layout/header'

export const Nav = [
    {
        name: 'Top',
        route: 'top'
    },
    {
        name: 'New',
        route: 'new'
    },
    {
        name: 'Show',
        route: 'show'
    },
    {
        name: 'Ask',
        route: 'ask'
    },
    {
        name: 'Jobs',
        route: 'jobs'
    }
]

const navLink = ({ name, route }, active) => {
    let className = active ? classes(link, activeLink) : link

    return h(Link, { className, to: `/${route}` }, name)
}

export default () =>
    h(`.${header}`, [
        h(`.${nav}`, [
            Nav.map(row => {
                return navLink(row, false)
            })
        ])
    ])
