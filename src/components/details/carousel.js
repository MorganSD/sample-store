import React, { Component } from "react";
import "../../style/detail.css";
import arrow from "../../Icon Simplestore/apple-keyboard-control-3.png";
import noPhoto from "../../Icon Simplestore/noPhoto.png";
import Rate from "../../components/rate";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

function Thumbnail(props) {
  if (props.thumbnail != null) {
    return <img src={props.thumbnail} />;
  } else {
    return <img src={noPhoto} />;
  }
}
class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      related: props.product,
      sliderTranslate: 0,
      currentIndex: 0,
      banner: null,
      transition: { transform: "translateX(0)" },
      carousel_avoider: 0,
      column: 3,
      style1: { width: props.product.length * 33 + "%" }
    };
    this.translateLeft = this.translateLeft.bind(this);
    this.translateRight = this.translateRight.bind(this);
  }

  translateRight = relatedItems => {
    const carousel_control = Math.floor(
      relatedItems.length / this.state.column
    );

    console.log(carousel_control, relatedItems.length, "carousel");
    if (relatedItems.length > this.state.column) {
      if (this.state.currentIndex === 0) {
        this.setState({
          transition: { transform: "translateX(100%)" },
          currentIndex: this.state.currentIndex + 1
        });
      } else if (this.state.currentIndex < relatedItems.length) {
        if (
          (this.state.currentIndex - relatedItems.length) %
            this.state.column ===
          0
        ) {
          return null;
        } else {
          let translator = (this.state.currentIndex + 1) * 100 + "%";
          console.log(translator);
          this.setState({
            transition: {
              transform: "translateX(" + translator + ")"
            },
            currentIndex: this.state.currentIndex + 1
          });
        }
      }
    } else {
      // return null
      alert("no right");
    }
    console.log(this.state);
  };

  translateLeft = relatedItems => {
    const carousel_control = Math.floor(
      relatedItems.length / this.state.column
    );

    console.log(carousel_control, relatedItems.length, "carousel");
    if (relatedItems.length > this.state.column) {
      if (this.state.currentIndex === 0) {
        return null;
      } else if (this.state.currentIndex < relatedItems.length) {
        let translator = (this.state.currentIndex - 1) * 100 + "%";
        console.log(translator);
        this.setState({
          transition: {
            transform: "translateX(" + translator + ")"
          },
          currentIndex: this.state.currentIndex - 1
        });
      } else {
        return null;
      }
    } else {
      return null;
    }
    console.log(this.state);
  };
  render() {
    console.log(this.state.style1.width);
    return (
      <React.Fragment>
        <div>
          <p>محصولات مشابه</p>
          <div className="carousel">
            <img
              src={arrow}
              className="carouselArrow"
              onClick={() => this.translateLeft(this.state.related)}
            />

            <div style={this.state.style1}>
              {this.state.related.map(item => (
                <div
                  className="carousel-items-wrapper"
                  style={this.state.transition}
                >
                  <div className="relatedBox">
                    <figure>
                      <Link to={`/item/${item.address}`}>
                        <Thumbnail thumbnail={item.thumbnail} />
                      </Link>
                      <figcaption> افزودن به سبد خرید</figcaption>
                    </figure>
                    <div>
                      <p>{item.title}</p>
                      <p>{item.price}</p>
                      <span className="related-Rate">
                        {" "}
                        <Rate product={item} />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <img
              src={arrow}
              className="carouselArrow"
              onClick={() => this.translateRight(this.state.related)}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Carousel;
