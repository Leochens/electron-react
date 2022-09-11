import Menu from './components/Menu'
import Home from './components/Home'
import Footer from './components/Footer'

const routes = [
    {
        name: 'menu',
        path: '/menu',
        component: Menu
    },
    {
        name: 'home',
        path: '/home',
        component: Home
    },
    {
        name: 'footer',
        path: '/footer',
        component: Footer
    }
]

export default routes