import React, { Component } from "react";
import "../style/itemImgSlider.css";
import noPhoto from "../Icon Simplestore/noPhoto.png";
import arrow from "../Icon Simplestore/apple-keyboard-control-3.png";
import ImageZoom from "react-medium-image-zoom";

const Thumbnail = props => {
  if (props.thumbnail != null) {
    return <img src={props.thumbnail} />;
  } else {
    return <img src={noPhoto} />;
  }
};

class SliderImg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: props.product,
      imageCount: null,
      sliderTranslate: 0,
      currentIndex: 0,
      banner: null,
      transition: { transform: "translateX(0)" },
      carousel_avoider: 0,
      diActive_carousel :{display : 'none'}
    };
    this.showOnBanner = this.showOnBanner.bind(this);
    this.translateRight = this.translateRight.bind(this);
  }

  showOnBanner = (slug, images) => {
    let bannerImg = images.find(image => image.slug === slug);
    this.setState({
      banner: bannerImg.image
    });
  };

  translateRight = images => {
    const carousel_control = Math.floor(images.length / 5);

    console.log(carousel_control, images.length, "carousel");
    if (images.length > 5) {
      if (this.state.currentIndex === 0) {
        this.setState({
          transition: { transform: "translateX(62px)" },
          currentIndex: this.state.currentIndex + 1
        });
      } else if (this.state.currentIndex < images.length) {
        if (this.state.carousel_avoider != carousel_control) {
          if (this.state.currentIndex % 5 === 0) {
            this.setState({
              carousel_avoider: this.state.carousel_avoider + 1
            });
          }
          let translator = (this.state.currentIndex + 1 ) * 62 + "px";
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
      return null
    }
    console.log(this.state);
  };
  translateLeft = images => {
    const carousel_control = Math.floor(images.length / 5);

    console.log(carousel_control, images.length, "carousel");
    if (images.length > 5) {
      if (this.state.currentIndex === 0) {
        return null;
      } else if (this.state.currentIndex < images.length) {
       
        let translator = (this.state.currentIndex - 1) * 62 + "px";
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
      return null
    }
    console.log(this.state);
  };

  render() {
    // const style1 =
    //   {width : this.state.products.images.length * 62 + 'px'}
    
    return (
      <React.Fragment>
        <div className="banner">
          {this.state.banner === null ? (
            this.props.product.thumbnail ? (
            <ImageZoom
              image={{
                src: this.props.product.thumbnail,
                alt: this.props.product.title,
                className: "img"
              }}
              zoomImage={{
                src: this.props.product.thumbnail,
                alt: this.props.product.title
              }}
            />
          ):(
          <img src={noPhoto} />)
          ) : (
            <ImageZoom
              image={{
                src: this.state.banner,
                alt: this.props.product.title,
                className: "img"
              }}
              zoomImage={{
                src: this.state.banner,
                alt: this.props.product.title
              }}
            />
          )}
        </div>
        {this.props.product.images ? (
          this.props.product.images.length != 0 ? (
            <div className="slider-carousel">
              <img
                src={arrow}
                className='carouselArrow'
                onClick={() => this.translateRight(this.props.product.images)}
              />
              <div>
                <div>
                  {this.props.product.images.map(image => (
                    <figure
                      style={this.state.transition}
                      onClick={() =>
                        this.showOnBanner(image.slug, this.props.product.images)
                      }
                      style={this.state.transition}
                    >
                      <img src={image.image} />
                      <figcaption />
                    </figure>
                  ))}
                </div>
              </div>
              <img
                src={arrow}
                className="carouselArrow"
                onClick={() => this.translateLeft(this.props.product.images)}
              />
            </div>
          ) : null
        ) : (
          <h3>no pic</h3>
        )}
      </React.Fragment>
    );
  }
}
export default SliderImg;
