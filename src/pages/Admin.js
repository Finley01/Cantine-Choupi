import React, { Component } from 'react';

export class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
    }
    componentDidMount() {
        const admintoken = localStorage.getItem("token");
        fetch("https://competa-api.dev.competa.com/api/orders?token=" + admintoken, {
            method: "GET",
        })
            .then(response => response.json())
            .then(response => {
                console.log(response)
                this.setState({ data: response })
            })
            .catch((e) => {
                console.log(e);
            }
            )
    }

    render() {

        let getOrders = () => {
            document.querySelector('.admin__orders').classList.toggle('admin__orders--active');
        }

        let logOut = () => {

            if (window.confirm('Are you sure you want to log out?')) {
                localStorage.setItem('token', undefined);
                document.location.reload(console.log('YEEEET'));
            }
        }

        let showProduct = (orders) => {
            document.querySelector('.admin__showproduct').classList.add('admin__showproduct--active')
            document.querySelector('.admin__showproduct--name').innerHTML = orders.firstname + ' ' + orders.lastname
            document.querySelector('.admin__showproduct--address').innerHTML = 'Adres: ' + orders.address + ' ' + orders.city + ' ' + orders.postalcode
            orders.lines.map(products => {
                // Still has bug where it only shows a single products id
                document.querySelector('.admin__showproduct--products').innerHTML += products.product_id + ' x' + products.amount + ' '
            })
            document.querySelector('.admin__showproduct--date').innerHTML = 'Besteld op: ' + orders.created_at
            document.querySelector('.admin__showproduct--price').innerHTML = 'Totaal prijs: &euro;' + orders.total_price
        }

        function closeProduct() {
            document.querySelector('.admin__showproduct').classList.remove('admin__showproduct--active');
        }

        return (
            <div className='admin'>
                <h1>Welcome to the Admin Panel</h1>
                <button onClick={() => getOrders()} className='admin__orderbtn'>Show Orders</button>
                <div className='admin__orders'>
                    <h3>Klik op een bestelling voor meer informatie</h3>
                    {
                        this.state.data.map(orders => (
                            <div className='admin__orderlist' key={orders.id} onClick={() => showProduct(orders)}>
                                <h4 className='admin__orderlist--name'>{orders.firstname} {orders.lastname}</h4>
                                <p className='admin__orderlist--address'>Adres: {orders.address} {orders.city} {orders.postalcode}</p>
                                <p className='admin__orderlist--date'>Besteld op: {orders.created_at}</p>
                                <h5 className='admin__orderlist--price'>Totaal prijs: &euro;{orders.total_price}</h5>
                            </div>
                        ))
                    }
                </div>
                <div className='admin__showproduct'>
                    <div className='admin__showproduct--modal'>
                        <h2 className='admin__showproduct--name'></h2>
                        <p className='admin__showproduct--address'></p>
                        <p className='admin__showproduct--products'>Bestelling: </p>
                        <p className='admin__showproduct--date'></p>
                        <p className='admin__showproduct--price'></p>
                        <span onClick={closeProduct} className='admin__showproduct--close'>&times;</span>
                    </div>
                </div>
                <button onClick={() => logOut()} className='admin__logout'>Log Out</button>
            </div>
        )
    }
}


