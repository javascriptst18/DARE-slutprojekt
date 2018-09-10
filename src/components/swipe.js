import React, { Component } from 'react';
import Slider from 'react-slick';
import darelogo from '../img/darelogo.svg';
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
      
        <div className="sliderDiv">
        <img src={darelogo} className="sliderContent logo"/>
          <h2>Do you?</h2>
          <p>Massa info om DARE, swipea för att läsa mer. Vilken size på text?</p>
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