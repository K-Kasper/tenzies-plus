import React from 'react';

export default function Die(props) {
  function dieFace() {
    switch (props.value) {
      case 1:
        return `
          '. . .'
          '. one .'
          '. . .'  
          `;
      case 2:
        return `
          '. . .'
          'one . two'
          '. . .'  
          `;
      case 3:
        return `
          'one . .'
          '. two .'
          '. . thr'  
          `;
      case 4:
        return `
          'one . two'
          '. . .'
          'thr . fou'  
          `;
      case 5:
        return `
          'one . two'
          '. thr .'
          'fou . fiv'  
          `;
      case 6:
        return `
          'one . fou'
          'two . fiv'
          'thr . six'  
          `;
      default:
        break;
    }
  }

  const styles = {
    backgroundColor: props.isHeld ? '#59E391' : 'white',
    gridTemplateAreas: `${dieFace()}`,
  };

  return (
    <div className="die-face" style={styles} onClick={props.holdDice}>
      <span className="dot1 dot"></span>
      {props.value >= 2 && <span className="dot2 dot"></span>}
      {props.value >= 3 && <span className="dot3 dot"></span>}
      {props.value >= 4 && <span className="dot4 dot"></span>}
      {props.value >= 5 && <span className="dot5 dot"></span>}
      {props.value >= 6 && <span className="dot6 dot"></span>}
    </div>
  );
}
