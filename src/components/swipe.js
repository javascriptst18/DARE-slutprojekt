import React, { Component } from 'react';
import Slider from 'react-slick';
import '../App.css';


class Swipeslider extends Component {


state = {

}


render() {

let settings = {
dots: true,
infinite: true,
speed: 500,
slidesToShow: 1,
slidesToScroll: 1,
infinite: false,
};

return (
      <Slider {...settings} className="sliderContent">
      
        <div>
          <h3>Bild1</h3>
        </div>
        <div>
          <h3>Bild2</h3>
        </div>
        <div>
          <h3>Bild3</h3>
        </div>
        <div>
          <h3>Bild4</h3>
        </div>
        <div>
          <h3>Bild5</h3>
        </div>
       
        
      </Slider>
    );
  }
}

export default Swipeslider;