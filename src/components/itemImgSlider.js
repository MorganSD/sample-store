import React, { Component } from "react";
import "../style/itemImgSlider.css";
import noPhoto from "../Icon Simplestore/noPhoto.png";
import arrow from "../Icon Simplestore/apple-keyboard-control-3.png";
import ImageZoom from "react-medium-image-zoom";
import ReactImageMagnify from 'react-image-magnify';
import close from '../Icon Simplestore/close.png';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app

const Thumbnail = props => {
  if (props.thumbnail != null) {
    return <img src={props.thumbnail} />;
  } else {
    return <img src={noPhoto} />;
  }
};


class LightBox extends Component{
  render(){
      return (
      <div className='lightBox'> 
      <img src={close} className='close_banner' onClick={this.props.action}/>
        <img src={this.props.banner} />
      </div>
    )
  }
}


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
      diActive_carousel :{display : 'none'},
      bannerZoomDispaly : false,
      photoIndex: 0,

    };
    this.showOnBanner = this.showOnBanner.bind(this);
    this.translateRight = this.translateRight.bind(this);
    this.escFunction = this.escFunction.bind(this);
  }
  escFunction(event){
    if(event.keyCode === 27) {
this.setState({
  bannerZoomDispaly : false
})    }
  }
  showOnBanner = (slug, images) => {
    let bannerImg = images.find(image => image.slug === slug);
    this.setState({
      banner: bannerImg.image
    });
  };

  translateRight = images => {
    const carousel_control = Math.floor(images.length / 5);

    // console.log(carousel_control, images.length, "carousel");
    if (images.length > 5) {
      if (this.state.currentIndex === 0) {
        this.setState({
          transition: { transform: "translateX(62px)" },
          currentIndex: this.state.currentIndex + 1
        });
      } else if (this.state.currentIndex < images.length) {
        if ((this.state.currentIndex - images.length) % 5 === 0) {
         }else{
           
          let translator = (this.state.currentIndex + 1 ) * 62 + "px";
          // console.log(translator);
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
    // console.log(this.state);
  };
  translateLeft = images => {
    const carousel_control = Math.floor(images.length / 5);

    // console.log(carousel_control, images.length, "carousel");
    if (images.length > 5) {
      if (this.state.currentIndex === 0) {
        return null;
      } else if (this.state.currentIndex < images.length) {
       
        let translator = (this.state.currentIndex - 1) * 62 + "px";
        // console.log(translator);
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
    // console.log(this.state);
  };

  lightBox = () => {
    // alert(this.props.product.images.indexOf(this.state.banner))
    // let display = this.state.bannerZoomDispaly;
    if(this.props.product.images.length > 0 )
   { this.setState({
      bannerZoomDispaly : true,
      // photoIndex : this.props.product.images.indexOf(this.state.banner)
    })}else {
    
      return null
    
    
    }
  }
 
  componentDidMount(){
    document.addEventListener("keydown", this.escFunction, false);
  
  }
  componentWillUnmount(){
    document.removeEventListener("keydown", this.escFunction, false);
  }
  render() {
    const img = this.props.product.images;
    // console.log('imgs',img)
    const { photoIndex, bannerZoomDispaly } = this.state;
        return (
      <React.Fragment>
       
         {bannerZoomDispaly && (
          <div style={{direction: 'ltr'}}>
          <Lightbox
            mainSrc={img[photoIndex].image}
            nextSrc={img[(photoIndex + 1) % img.length].image}
            prevSrc={img[(photoIndex + img.length - 1) % img.length].image}
            onCloseRequest={() => this.setState({ bannerZoomDispaly: false })}
            onMovePrevRequest={() =>
              this.setState({
                photoIndex: (photoIndex + img.length - 1) % img.length,
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: (photoIndex + 1) % img.length,
              })
            }
          />
          </div>
        )}
        <div className="banner" onClick={() => this.lightBox()}>
          {this.state.banner === null ? (
            this.props.product.thumbnail ? (
              <ReactImageMagnify {...{
                smallImage: {
                    alt: '',
                    isFluidWidth: true,
                    src: this.props.product.thumbnail
                      },
                largeImage: {
                    src: this.props.product.thumbnail ,
                    width: 1200,
                    height: 1800
                }
            }} />
          ):(
          <img src={noPhoto} />) 
           ) : (       
            <ReactImageMagnify {...{
            smallImage: {
                alt: '',
                isFluidWidth: true,
                src: this.state.banner
                  },
            largeImage: {
                src: this.state.banner,
                width: 1200,
                height: 1800
            }
        }} />
      
           )}  

        </div>
        {this.props.product.images ? (
          this.props.product.images.length != 0 ? (
            <div className="slider-carousel">
              <img
                src={arrow}
                className='carouselArrow'
                onClick={() => this.translateLeft(this.props.product.images)}
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
                onClick={() => this.translateRight(this.props.product.images)}
              />
            </div>
          ) : null
        ) : (
          <h5>Loading ...</h5>
        )}
      </React.Fragment>
    );
  }
}
export default SliderImg;