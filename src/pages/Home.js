import React, { Component } from 'react';

export class Home extends Component {
	render() {
		return (
			<div className='content'>
				<header className='header'>
					<div className='header__title'>
						<h1>Welkom bij Cantine Choupi</h1>
						<h3 className='header__subtitle'>Dit zijn de huidige aanbiedingen</h3>
					</div>
				</header>
				<section className='home'>
					<div className='home__aanbiedingen'>
					<ul className='home__item'>
							<li>Pizza 1</li>
							<li>10,-</li>
						</ul>
						<ul className='home__item'>
							<li>Pizza 2</li>
							<li>10,-</li>
						</ul>
						<ul className='home__item'>
							<li>Pizza 3</li>
							<li>10,-</li>
						</ul>
						<ul className='home__item'>
							<li>Pizza 1</li>
							<li>10,-</li>
						</ul>
						<ul className='home__item'>
							<li>Pizza 2</li>
							<li>10,-</li>
						</ul>
						<ul className='home__item'>
							<li>Pizza 3</li>
							<li>10,-</li>
						</ul>
					</div>
				</section>
			</div>
		)
	}
}

export default Home
