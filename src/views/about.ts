import h from 'inferno-hyperscript'
import { Link } from 'inferno-router'

export default () => h('.about', ['About', h(Link, { to: '/' }, 'Home')])
