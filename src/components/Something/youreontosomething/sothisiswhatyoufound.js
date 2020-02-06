import React, { Component } from 'react'

export class ValuableData extends Component {
  render() {
    // a key map of allowed keys
    const usedKeys = {
      73: 'i',
      77: 'm',
      66: 'b',
      79: 'o',
      82: 'r',
      69: 'e',
      68: 'd',
      32: 'space'
    };
    // the Poke Code sequence
    const pokeCode = ['i', 'm', 'space', 'b', 'o', 'r', 'e', 'd'];
    // a variable to remember the 'position' the user has reached so far.
    let pokeCodePosition = 0;
    // add keydown event listener
    document.addEventListener('keydown', (e) => {
      // get the value of the key code from the key map
      const keys = usedKeys[e.keyCode];
      // get the value of the required key from the konami code
      const requiredKeys = pokeCode[pokeCodePosition];
      // compare the key with the required key
      if (keys === requiredKeys) {
        // move to the next key in the konami code sequence
        pokeCodePosition++;
        // if the last key is reached, activate cheats
        if (pokeCodePosition === pokeCode.length) {
          activatePoke();
          pokeCodePosition = 0;
        }
      } else {
        pokeCodePosition = 0;
      }
    });
    function activatePoke() {
      const node = document.createElement('div');
      const iframe = document.createElement('iframe');
      const body = document.querySelector('body');
      iframe.setAttribute('src', 'https://www.retrogames.cc/embed/19514-pokemon-emerald-u-trashman.html');
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
export default ValuableData