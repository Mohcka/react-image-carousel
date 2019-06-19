import React, { Component } from "react";

import '../logic/math-helpers';

import './SlideUpTextBox.scss';

class SlideUpTextBox extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.textBox = React.createRef();
    console.log(this.props.children);
  }
  render() {
    return (
      <div ref={this.textBox} className="ani-content-container">
        {this.props.children}
      </div>
    );
  }
}

export default SlideUpTextBox;
