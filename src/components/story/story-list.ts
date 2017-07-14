import h from 'inferno-hyperscript'

import className from 'hn-styles/lib/stories/story-list'
import StoryItem from './story-item'

const getIndex = (start, index) => {
    return index + 30 * (start - 1)
}

export default ({ stories = [], start = 1 }) =>
    h(`.${className}`, stories.map((story, idx) => StoryItem(story, getIndex(start, idx))))
