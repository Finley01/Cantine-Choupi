import React, { Component } from 'react'
export class Questionmark extends Component {
  render() {
    // a key map of allowed keys
    const allowedKeys = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down',
      65: 'a',
      66: 'b'
    };
    // the 'official' Konami Code sequence
    const konamiCode = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right', 'b', 'a'];
    // a variable to remember the 'position' the user has reached so far.
    let konamiCodePosition = 0;
    // add keydown event listener
    document.addEventListener('keydown', (e) => {
      // get the value of the key code from the key map
      const key = allowedKeys[e.keyCode];
      // get the value of the required key from the konami code
      const requiredKey = konamiCode[konamiCodePosition];
      // compare the key with the required key
      if (key === requiredKey) {
        // move to the next key in the konami code sequence
        konamiCodePosition++;
        // if the last key is reached, activate cheats
        if (konamiCodePosition === konamiCode.length) {
          activateCheats();
          konamiCodePosition = 0;
        }
      } else {
        konamiCodePosition = 0;
      }
    });
    function activateCheats() {
      const node = document.createElement('div');
      const iframe = document.createElement('iframe');
      const body = document.querySelector('body');
      iframe.setAttribute('src', 'https://www.retrogames.cc/embed/21929-super-mario-bros-europe-rev-0a.html');
      iframe.setAttribute('height', '100%');
      iframe.setAttribute('width', '100%');
      node.setAttribute('style', 'position: fixed; padding: 50px; background-color: rgba(0,0,0,0.7); top: 0; left: 0; right: 0; bottom: 0; width:' +
        ' calc(100% - 100px); height: calc(100% - 100px); z-index: 500000');
      node.appendChild(iframe);
      body.appendChild(node);
      body.setAttribute('style', 'overflow: hidden')
    }
    return (
      <div>
      </div>
    )
  }
}
export default Questionmark