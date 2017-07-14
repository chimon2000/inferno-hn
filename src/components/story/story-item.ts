import h from 'inferno-hyperscript'
import { article, index, detail, link, unstyled, unstyledLink } from 'hn-styles/lib/stories/story-item'
import { Link } from 'inferno-router'

export default (story, idx) =>
    h(`article.${article}`, [
        h(`.${index}`, idx + 1),
        h('div', [
            h(`a.${unstyledLink}`, { href: story.url }, story.title),
            h(`.${detail}`, [
                h('span', `${story.points} points by `),
                h(Link, { className: link, to: `/user/${story.user}` }, story.user),
                h('span', ` ${story.time_ago} `),
                h(Link, { className: link, to: `/story/${story.id}` }, `${story.comments_count} comments`)
            ])
        ])
    ])
