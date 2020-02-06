import React, { Component } from 'react'
import APICall from '../components/js/APICall'

export class Menu extends Component {
	render() {
		return (
			<section>
				<header className='header'>
					<h1 className='header__title'>Menu</h1>
				</header>
				<div>
					<APICall/>
				</div>
			</section>

		)
	}
}

export default Menu
