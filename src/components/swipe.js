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
    <h2 className="swipeHeader">Aktivitet</h2>
    <p className="swipeText">Vi har aktiviteter för allas budget, från 0kr och uppåt. lalala...</p>
  </div>

  <div className="swipeDiv">
    <img src={wallet} className="swipeContent swipeIcon"/>
    <h2 className="swipeHeader">Budget</h2>
    <p className="swipeText">Vi anpassar aktiviteten för din budget. Vare sig du har 0kr eller 5000kr på kontot, ta det lugnt, vi fixar nått för dig!</p>
  </div>

  <div className="swipeDiv">
    <img src={wallet} className="swipeContent swipeIcon"/>
    <h2 className="swipeHeader">Datum och tid</h2>
    <p className="swipeText">Vet du om att </p>
  </div>
  
  <div className="swipeDiv">
    <img src={wallet} className="swipeContent swipeIcon"/>
    <h2 className="swipeHeader">Vi matchar dig</h2>
    <p className="swipeText">Baserat på dina val utmanar vi dig att testa på spännande aktiviteter med nya människor lalala.. </p>
  </div>
 
  
</Slider>
    );
  }
}

export default SwipeSlider;