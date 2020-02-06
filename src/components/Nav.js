import React, { Component } from 'react'
import Home from '../pages/Home'
import Menu from '../pages/Menu'
import Checkout from '../pages/Checkout'
import logo from './img/logo.png'
import { Link, Route, Switch, Redirect } from 'react-router-dom'
import { Admin } from '../pages/Admin'

class PrivateRoute extends Component {
	render() {
		if (localStorage.getItem('token') !== 'ItsMeMario') {
			return <Redirect to='/' />
		}

		return <Route {...this.props} />
	}
}

export class Nav extends Component {
	render() {
		return (
			<section>
				<nav className='navbar'>
					<Link to={'/'}><img className='navbar__logo' src={logo} alt='Cantine Choupi' /></Link>
					<li className='navbar__item'><Link className='navbar__link' to={'/'}>Home</Link></li>
					<li className='navbar__item'><Link className='navbar__link' to={'/Menu'}>Menu</Link></li>
					<li className='navbar__item'><Link className='navbar__link' to={'/Checkout'}>Checkout</Link></li>
				</nav>
				<Switch>
					<Route exact path='/' component={Home} />
					<Route path='/Menu' component={Menu} />
					<Route path='/Checkout' component={Checkout} />
					<PrivateRoute path='/Admin' component={Admin} />
				</Switch>
			</section>
		)
	}
}

export default Nav
