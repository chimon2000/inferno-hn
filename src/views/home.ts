import h from 'inferno-hyperscript'
import { Link } from 'inferno-router'

export default () => h('.home', ['Welcome Home', h(Link, { to: '/about' }, 'About')])
