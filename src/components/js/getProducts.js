import React, { Component } from 'react';
// import Rem from '../img/remove.svg';
import Add from '../img/plus.svg';
import Min from '../img/minus.svg';

export class getProducts extends Component {
    render() {

        let order = JSON.parse(localStorage.getItem('order') || '[]');
        const totalPrice = order.reduce((total, items) => total + Number(items.price * items.amount), 0).toFixed(2);

        let addProduct = (products) => {
            let check = order.find(e => e.name === products.name);

            if (check === undefined) {
                products['amount'] = 1;
                order.push(products);
            } else {
                products['amount'] = check.amount;
                products['amount']++;
                check.amount = products['amount'];
            }
            localStorage.setItem('order', JSON.stringify(order));
            window.location.reload(false);
        }

        let minProduct = (products) => {
            let check = order.find(e => e.name === products.name);

            if (products['amount'] === 1) {
                order.splice(products, 1);
            } else {
                products['amount'] = check.amount;
                products['amount']--;
                check.amount = products['amount'];
            }
            localStorage.setItem('order', JSON.stringify(order));
            window.location.reload(false);
        }

        return (
            <div className='order'>
                <h2 className='order__header'>Uw bestelling:</h2>
                <div className='order__items'>
                    {
                        order.map(products => (
                            <div className='order__container' key={products.id}>
                                <p className='order__item'>{products.name} x{products.amount}: &euro;{(products.amount * products.price).toFixed(2)}</p>
                                <img src={Add} alt='Add to cart' className='order__button' onClick={() => addProduct(products)} />
                                <img src={Min} alt='Remove single item from cart' className='order__button' onClick={() => minProduct(products)} />
                                {/* <img src={Rem} alt='Remove from cart' className='order__button' onClick={() => remProduct(products)} /> */}
                            </div>
                        ))
                    }
                </div>
                <p className='order__total'>Totale prijs: &euro;{totalPrice}</p>
            </div>
        );
    }
}

export default getProducts
