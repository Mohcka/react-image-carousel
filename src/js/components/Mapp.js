import React, { Component } from "react";
import ImageCarousel from "./ImageCarousel";
import SlideUpTextBox from './SlideUpTextBox';

import mt from '../logic/math-helpers';

import './Mapp.scss';

class Mapp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 2,
      timerDelay: 5000
    };

    this.images = [
      "https://images.unsplash.com/photo-1560306247-e251d8429306?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1334&q=80",
      "https://images.unsplash.com/photo-1560305527-51dc8ad5a8f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1425&q=80",
      "https://images.unsplash.com/photo-1560306796-3238e049ff45?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
    ];
  }

  componentDidMount() {
    this.createSlideInterval(this.state.timerDelay);
  }

  changeIndex = ind => {
    this.setState({activeIndex: ind});
  }

  createSlideInterval = dur => {
     this.slideInterval = setInterval(() => {
       this.changeIndex(mt(this.state.activeIndex + 1, this.images.length))
     }, this.state.timerDelay);
  }

  goNext = () => {
    this.changeIndex(this.state.activeIndex + 1);
  }

  render() {
    
    return (
      <div className="mapp-container">
        <ImageCarousel
          timerDelay={this.state.timerDelay}
          images={this.images}
          color={`#48ccdb`}
        />

        
      </div>
    );
  }
}

export default Mapp;
