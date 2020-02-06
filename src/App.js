import React from 'react';
import Nav from './components/Nav'
import Footer from './components/Footer'
import { BrowserRouter as Router } from 'react-router-dom'
import './App.scss';
import Questionmark from './components/Something/youreontosomething/youfoundit';
import ValuableData from './components/Something/youreontosomething/sothisiswhatyoufound';
import Special from './components/Something/youreontosomething/somethingelse';

class App extends React.Component {
	render() {
		return (
			<Router>
				<Nav />
				<Questionmark/>
				<ValuableData/>
				<Special />
				<Footer />
			</Router>
		);
	}
}

export default App;
