import React, { Component } from 'react';
import Min from '../img/minus.svg';
import Add from '../img/plus.svg';

export class APICall extends Component {

    state = {
        loading: true,
        category: [],
        order: JSON.parse(localStorage.getItem('order') || '[]'),
    }

    async componentDidMount() {
        const url = 'https://competa-api.dev.competa.com/api/categoriesWithProducts';
        const response = await fetch(url);
        const data = await response.json();
        data[0].products[0].name = 'Salami'  // This is here to turn 'salame' into 'salami'
        this.setState({
            category: data.filter(function (x) {
                return (x.products.length !== 0)
            }), loading: false
        });
    }

    render() {

        let addProduct = (product) => {
            let check = this.state.order.find(e => e.name === product.name);

            if (check === undefined) {
                product['amount'] = 1;
                this.state.order.push(product);
            } else {
                product['amount'] = check.amount;
                product['amount']++;
                check.amount = product['amount'];
            }
            localStorage.setItem('order', JSON.stringify(this.state.order));
        }

        let minProduct = (product) => {
            let check = this.state.order.find(e => e.name === product.name);

            if (product['amount'] === 1) {
                this.state.order.splice(product, 1);
            } else {
                product['amount'] = check.amount;
                product['amount']--;
                check.amount = product['amount'];
            }
            localStorage.setItem('order', JSON.stringify(this.state.order));
        }

        if (this.state.loading) {
            return <div className='menu__loading'>loading...</div>;
        }

        if (!this.state.category) {
            return <div className='menu__noresult'>didn't get an item</div>;
        }

        return (
            <div>
                {
                    this.state.category.map(data => (
                        <div className='menu' key={data.id}>
                            <h1 className='menu__title'>{data.name}</h1>

                            {
                                data.products.map(product => (
                                    <div className='products' key={product.id}>
                                        <h3 className='products__item'>{product.name} </h3>
                                        <p className='products__desc'>{product.description} </p>
                                        <h3 className='products__price'>&euro;{product.price}</h3>
                                        <img src={Add} alt="Add to cart" className='products__button' onClick={() => addProduct(product)} />
                                        <img src={Min} alt='Remove single item from cart' className='products__button' onClick={() => minProduct(product)} />
                                    </div>
                                ))
                            }
                        </div>
                    ))
                }
            </div>
        );
    }
}

export default APICall
