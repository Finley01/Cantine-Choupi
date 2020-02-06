import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export class Special extends Component {

    constructor(props) {
        super(props);
        this.state = { name: '', password: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ name: event.target.value });
    }

    handleChange2(event) {
        this.setState({ password: event.target.value });
    }

    handleSubmit(event) {
        const formData = new FormData()
        formData.append("name", this.state.name);
        formData.append("password", this.state.password);
        fetch("https://competa-api.dev.competa.com/api/authorise", {
            method: "POST",
            body: formData,
        })
            .then(response => response.json())
            .then(response => {
                localStorage.setItem('token', response.token);
                this.setState({ response: response.token });
            })
            .catch(() => {
                localStorage.setItem('token', undefined);
                alert('Username or Password incorrect');
            }
            )
        event.preventDefault();
    }

    render() {
        if (this.state.response) {
            return <Redirect to="/Admin" />
        }

        // a key map of allowed keys
        const allowedKeys = {
            68: 'd',
            73: 'i',
            78: 'n',
            77: 'm',
            65: 'a'
        };
        // the 'official' Admin Code sequence
        const adminCode = ['a', 'd', 'm', 'i', 'n'];
        // a variable to remember the 'position' the user has reached so far.
        let adminCodePosition = 0;
        // add keydown event listener
        document.addEventListener('keydown', (e) => {
            // get the value of the key code from the key map
            const key = allowedKeys[e.keyCode];
            // get the value of the required key from the Admin code
            const requiredKey = adminCode[adminCodePosition];
            // compare the key with the required key
            if (key === requiredKey) {
                // move to the next key in the Admin code sequence
                adminCodePosition++;
                // if the last key is reached, activate Panel
                if (adminCodePosition === adminCode.length) {
                    activatePanel();
                    adminCodePosition = 0;
                }
            } else {
                adminCodePosition = 0;
            }
        });
        function activatePanel() {
            document.querySelector('.panel').classList.add('panel--active');
        };

        function closePanel() {
            document.querySelector('.panel--active').classList.remove('panel--active');
        };

        return (
            <div className='panel'>
                <form onSubmit={this.handleSubmit} className='panel__login'>
                    <h3>Login Here</h3>
                    <input type='text' placeholder='Username' className='panel__input' value={this.state.name} onChange={this.handleChange} required />
                    <input type='password' placeholder='Password' className='panel__input' value={this.state.password} onChange={this.handleChange2} name='password' required />
                    <input type='submit' value='Submit' className='panel__submit' />
                    <span onClick={closePanel} className='panel__close'>&times;</span>
                </form>
            </div>
        )
    }
}
export default Special