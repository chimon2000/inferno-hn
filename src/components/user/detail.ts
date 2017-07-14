import { className, link } from './detail.style'
import h from 'inferno-hyperscript'

export default user =>
    h(`section.${className}`, [
        h(`h2`, `User: ${user.id}`),
        h('div', `Created: ${user.created}`),
        h('div', `Karma: ${user.karma}`),
        h('div', { innerHTML: user.about || '' }),
        h('div', [
            h(`a.${link}`, { href: `https://news.ycombinator.com/submitted?id=${user.id}` }, 'submissions'),
            h('span', ' | '),
            h(`a.${link}`, { href: `https://news.ycombinator.com/threads?id=${user.id}` }, 'comments'),
            h('span', ' | '),
            h(`a.${link}`, { href: `https://news.ycombinator.com/favorites?id=${user.id}` }, 'favorites')
        ])
    ])
