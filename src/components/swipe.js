import React, { Component } from 'react';
import Slider from 'react-slick';
import darelogo from './img/darelogo.svg';
import wallet from './img/wallet.svg';
import swiperightwhite from './img/swiperightwhite.svg';
import '../App.css';



class SwipeSlider extends Component {

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
  <Slider {...settings} className="swipeContent">
      
  <div className="swipeDiv">
    <img src={darelogo} className="swipeContent swipeIcon"/>
    <img src={swiperightwhite} className="swipeContent swipeRight"/>
    <p className="swipeText">Swipe right to read more about DARE.<br></br> Or just log in straight away!</p>
  </div >

  <div className="swipeDiv">
    <img src={wallet} className="swipeContent swipeIcon"/>
    <h2 className="swipeHeader">Välj nivå av aktivitet</h2>
    <p className="swipeText">Vi har aktiviteter för allas budget, från 0kr och uppåt.</p>
  </div>

  <div className="swipeDiv">
    <img src={wallet} className="swipeContent swipeIcon"/>
    <h2 className="swipeHeader">Välj din budget</h2>
    <p className="swipeText">Det finns aktiviteter för allas budget lalala...</p>
  </div>

  <div className="swipeDiv">
    <img src={wallet} className="swipeContent swipeIcon"/>
    <h2 className="swipeHeader">Välj datum och tid</h2>
    <button className="buttonLogIn">Ta bort knappen <i class="fa fa-close"></i></button>
    <br></br>
    <button className="buttonLogOut">Något input field kanske</button>
  </div>
  
  <div className="swipeDiv">
    <img src={wallet} className="swipeContent swipeIcon"/>
    <h2 className="swipeHeader">Vi matchar dig med andra</h2>
    <p className="swipeText">Vi har aktiviteter för allas budget, från 0kr och uppåt.</p>
  </div>
 
  
</Slider>
    );
  }
}

export default SwipeSlider;