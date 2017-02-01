// CSS/Assets
import './Button.scss';

// JS
import React from 'react';

class Button extends React.Component {
  render() {
    return (
      <button className='btn' onClick={ this.props.clickHandler }>
        { this.props.text }
      </button>
    )
  }
}

export default Button;
