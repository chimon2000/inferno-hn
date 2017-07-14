import { NO_OP, linkEvent } from 'inferno'
import h from 'inferno-hyperscript'

import { classes } from 'typestyle'
import withState from 'incompose/dist/withState'
import compose from 'incompose/dist/compose'
import { Link } from 'inferno-router'

import { article, child, link, hide, select, more, commentList, content } from 'hn-styles/lib/comments/comment-item'

const children = (comments: any[], onClick) => {
    if (comments.length == 0) return NO_OP

    return h(`.${hide}`, [h(`.${select}`, { onClick })])
}

const showMore = (comment, onClick) =>
    h(`.${classes(more, select)}`, { onClick }, `[+] ${comment.comments.length} replies collapsed`)

const toggleShowComments = ({ setShowComments, showComments }) => {
    setShowComments(!showComments)
}

const withCommentState = withState('showComments', 'setShowComments', true)

const Comment = ({ showComments = true, comment, isChild = false, setShowComments }) =>
    h(`article.${isChild ? classes(child, article) : article}`, [
        h(`header`, [
            h(Link, { className: link, to: `/user/${comment.user}` }, comment.user),
            h('span', ` ${comment.time_ago}`)
        ]),
        h(`.${content}`, { innerHTML: comment.content }),
        showComments
            ? children(comment.comments, linkEvent({ showComments, setShowComments }, toggleShowComments))
            : showMore(comment, linkEvent({ showComments, setShowComments }, toggleShowComments))
    ])

export default compose(withCommentState)(Comment)
