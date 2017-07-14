import * as loading from '../../images/loading.svg'
import { wrapper, image } from './loading.style'
import h from 'inferno-hyperscript'

export default () => h(`.${wrapper}`, [h(`img.${image}`, { src: loading })])
