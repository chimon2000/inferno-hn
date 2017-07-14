import { NO_OP, linkEvent } from 'inferno'
import h from 'inferno-hyperscript'
import Component from 'inferno-component'
import { classes } from 'typestyle'
import { Link } from 'inferno-router'
import { style, keyframes } from 'typestyle'
import { px, white, em, blue, color } from 'csx'

import StoryList from '../components/story/story-list'
import Loading from '../components/loading/loading'
import model from '../models/stories'

let h1 = style({
    color: blue.toHexString()
})

const pageToListType = {
    top: 'news',
    new: 'newest',
    jobs: 'jobs',
    ask: 'ask',
    show: 'show'
}

const loadingAnimation = keyframes({
    '0%': { opacity: 0 },
    '50%': { opacity: 1 }
})

const className = style({
    animationName: loadingAnimation,
    animationDuration: '2s',
    marginTop: px(1)
})

const pager = style({
    paddingLeft: em(3.2),
    paddingTop: em(1.5),
    backgroundColor: white.toHexString()
})

const link = style({
    color: color('#d31b33').darken(0.1).toHexString(),
    textDecoration: 'none',
    fontWeight: 600
})

type StoriesProps = {
    params: {
        category: string
        page: number
    }
}

type StoriesState = {
    category: string
    page: number
    stories: any[]
    loading: boolean
}

export default class Stories extends Component<StoriesProps, StoriesState> {
    constructor(props: StoriesProps) {
        super(props)

        const { category, page = 1 } = props.params
        console.log(props)

        this.state = {
            category,
            page,
            stories: [],
            loading: false
        }
    }

    async componentDidMount() {
        const listType = pageToListType[this.state.category]
        const page = this.state.page

        console.log(listType, page)
        await model.load({ listType, page })

        const { list: loading } = model.loading
        const { list: stories } = model

        this.setState({
            loading,
            stories
        })
    }

    async loadMore(page) {
        console.log(page)
        const listType = pageToListType[this.state.category]

        this.setState({ loading: true })

        await model.load({ listType })

        const { list: loading } = model.loading
        const { list: stories } = model

        this.setState({
            loading,
            stories,
            page
        })

        document.body.scrollTop = 0
    }

    render() {
        const loading = this.state.loading
        const stories = this.state.stories
        const category = this.state.category
        let page = this.state.page

        // return h(Loading)

        return loading
            ? h(Loading)
            : h(`.${className}`, [
                  StoryList({ stories, start: page }),
                  h(`.${pager}`, [
                      h(
                          Link,
                          {
                              to: `/stories/${category}/${++page}`,
                              className: link,
                              onClick: () => this.state.page > 1 && this.loadMore(page)
                          },
                          'More...'
                      )
                  ])
              ])
    }
}
