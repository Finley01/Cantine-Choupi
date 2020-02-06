import React, { Component } from 'react'
import Order from '../components/js/getProducts'

export class Checkout extends Component {

	constructor(props) {
		super(props);
		this.state = { name: '', lastname: '', email: '', phone: '', zipcode: '', street: '', number: '', order: '' };

		this.handleChangeName = this.handleChangeName.bind(this);
		this.handleChangeLastname = this.handleChangeLastname.bind(this);
		this.handleChangeEmail = this.handleChangeEmail.bind(this);
		this.handleChangePhone = this.handleChangePhone.bind(this);
		this.handleChangeZipcode = this.handleChangeZipcode.bind(this);
		this.handleChangeStreet = this.handleChangeStreet.bind(this);
		this.handleChangeNumber = this.handleChangeNumber.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChangeName(event) {
		this.setState({ name: event.target.value });
	}

	handleChangeLastname(event) {
		this.setState({ lastname: event.target.value });
	}

	handleChangeEmail(event) {
		this.setState({ email: event.target.value });
	}

	handleChangePhone(event) {
		this.setState({ phone: event.target.value });
	}

	handleChangeZipcode(event) {
		this.setState({ zipcode: event.target.value });
	}

	handleChangeStreet(event) {
		this.setState({ street: event.target.value });
	}

	handleChangeNumber(event) {
		this.setState({ number: event.target.value })
	}

	handleSubmit(event) {
		const order = JSON.parse(localStorage.getItem("order") || '[]')
		const data = {
			firstname: this.state.name,
			lastname: this.state.lastname,
			email: this.state.email,
			phone: this.state.phone,
			postalcode: this.state.zipcode,
			address: this.state.street,
			city: this.state.number,
			order_lines: order.map(order => ({
				product_id: order.id,
				amount: order.amount,
			})),
		}
		fetch("https://competa-api.dev.competa.com/api/orders", {
			method: "POST",
			body: JSON.stringify(data),
			token: "ItsMeMario",
			headers: {
				'Content-type': 'application/json'
			}
		})
			.then(response => response.json())
			.then(response => {
				this.setState({ response: response.token });
				localStorage.removeItem('order');
				alert('Order has been placed!')
			})
			.catch((e) => {
				console.log(e);
			}
			)
		event.preventdefault();
	}

	render() {
		return (
			<section>
				<header className='header'>
					<h1 className="header__title">Checkout</h1>
				</header>
				<div className='form'>
					<form className='form__container' onSubmit={this.handleSubmit}>
						<input type='text' placeholder='Voornaam' className='form__input' value={this.state.name} onChange={this.handleChangeName} required />
						<input type='text' placeholder='Achternaam' className='form__input' value={this.state.lastname} onChange={this.handleChangeLastname} required />
						<input type='email' placeholder='Emailadres' className='form__input' value={this.state.email} onChange={this.handleChangeEmail} />
						<input type='tel' placeholder='Telefoonnummer' className='form__input' value={this.state.phone} onChange={this.handleChangePhone} />
						<input type='text' placeholder='Postcode' className='form__input' value={this.state.zipcode} onChange={this.handleChangeZipcode} required />
						<input type='text' placeholder='Straatnaam' className='form__input' value={this.state.street} onChange={this.handleChangeStreet} required />
						<input type='text' placeholder='Huisnummer' className='form__input' value={this.state.number} onChange={this.handleChangeNumber} required />
						<input type='submit' value='Send' className='form__submit' />
					</form>
					<Order />
				</div>
			</section>
		)
	}
}

export default Checkout
