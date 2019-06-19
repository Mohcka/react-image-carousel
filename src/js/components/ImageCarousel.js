import React, { Component } from "react";
import anime from "animejs";

import mod from "../logic/math-helpers";

import "./ImageCarousel.scss";

class ImageCarousel extends Component {
  constructor(props) {
    super(props);

    this.var = "";

    this.state = {
      activeIndex: this.props.activeImageInd ? this.props.activeImageInd : 0,
      paused: false,
      inMotion: false,
      isForward: true,
      delay: this.props.timerDelay ? this.props.timerDelay : 10000
    };

    this.imageSlider = React.createRef();
  }

  componentDidMount() {
    // Intialize IMAGES
    anime.set(this.imageSlider.current.children, {
      translateX: "100%"
    });

    anime.set(this.imageSlider.current.children[0], {
      translateX: 0
    });

    this.createSlideInterval();
  }

  createSlideInterval = () => {
    this.slideInterval = setInterval(() => {
      this.nextTransition();
    }, this.state.delay);
  };

  resetTimer = () => {
    clearInterval(this.slideInterval);

    this.createSlideInterval();
  };

  // Goes to the next image of the slideshow
  goNext = () => {
    if (!this.state.isForward)
      this.setState({ isForward: !this.state.isForward }, () => this.moveBy(1));
    else this.moveBy(1);
  };

  // Goes to the previous image of the slideshow
  goPrev = () => {
    if (this.state.isForward)
      this.setState({ isForward: !this.state.isForward }, () =>
        this.moveBy(-1)
      );
    else this.moveBy(-1);
  };

  nextTransition = () => {
    if (this.state.isForward) this.goNext();
    else this.goPrev();
  };

  // Go to the image of the specified index
  goTo = ind => {
    this.moveBy(this.state.activeIndex + ind);
  };

  // Move the slideshow by X amount of spaces
  moveBy = spaces => {
    let length = this.props.images.length;

    this.setState(
      {
        // set active index to specifie
        activeIndex: mod(this.state.activeIndex + spaces, length),
        isForward: spaces >= 0 ? true : false
      },
      () => {
        let imgIn = this.imageSlider.current.children[this.state.activeIndex];
        let imgOut = this.imageSlider.current.children[
          mod(this.state.activeIndex - spaces, length)
        ];

        this.slideImage(imgIn, imgOut);
      }
    );
  };

  /**
   * Trigger the carousel
   */
  slideImage = (imgIn, imgOut) => {
    let inDirection = this.state.isForward ? ["100%", 0] : ["-100%", 0];
    let outDirection = this.state.isForward ? [0, "-100%"] : [0, "100%"];

    // add classes for each of the slide images
    imgIn.classList.add("ani-slide-curr");
    imgOut.classList.remove("ani-slide-curr");

    anime.remove(this.imageSlider.current.children);

    anime.set(this.imageSlider.current.children, {
      translateX: "100%"
    });

    // create timeline
    let tl = anime.timeline({
      easing: "easeInOutQuad",
      duration: 2000
    });

    tl.add({ targets: imgIn, translateX: inDirection })
      .add(
        {
          targets: imgOut,
          translateX: outDirection
        },
        "-=2000"
      )
      .finished.then(() => {});
  };

  render() {
    return (
      <div
        className="image-carousel-container"
        onMouseEnter={() => clearInterval(this.slideInterval)}
        onMouseLeave={() => this.resetTimer(this.state.delay)}
      >
        <div ref={this.imageSlider} className="ani-slide-container">
          {this.props.images.map((img, i) => (
            <div
              key={i}
              className={`ani-slide-img slide-img-${i}`}
              style={{ backgroundImage: `url(${img})` }}
            />
          ))}
        </div>
        <div className="controls">
          <div
            onClick={() => this.goPrev()}
            className="control-btn prev-btn"
            style={{ borderBottom: `2px solid ${this.props.color ? this.props.color : 'white'}` }}
          >
            Prev
          </div>
          <div
            onClick={() => this.goNext()}
            className="control-btn next-btn"
            style={{ borderBottom: `2px solid ${this.props.color ? this.props.color : 'white'}` }}
          >
            Next
          </div>
        </div>
      </div>
    );
  }
}

export default ImageCarousel;
