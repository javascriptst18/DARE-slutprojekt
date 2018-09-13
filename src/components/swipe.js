import React, { Component } from 'react';
import Slider from 'react-slick';
import darelogo from './img/darelogo.svg';
import wallet from './img/wallet.svg';
import match from './img/match.svg';
import date from './img/date.svg';
import ticket from './img/ticket.svg';
import swiperightwhite from './img/swiperightwhite.svg';
import '../App.css';



class SwipeSlider extends Component {

state = {

}

render() {

    let settings = {
      dots: true,
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
    <p className="swipeText">Swipea höger för att läsa om DARE.<br></br> Eller logga in direkt!</p>
  </div >

  <div className="swipeDiv">
    <img src={ticket} className="swipeContent swipeIcon"/>
    <h2 className="swipeHeader">Dares</h2>
    <p className="swipeText">Vi erbjuder dig att testa på massor av spännande aktiviteter(Dares), du väljer nivå, vi hittar en aktivitet för dig.</p>
  </div>

  <div className="swipeDiv">
    <img src={wallet} className="swipeContent swipeIcon"/>
    <h2 className="swipeHeader">Budget</h2>
    <p className="swipeText">Vi anpassar aktiviteten för din budget. Vare sig du har 0kr eller 5000kr på kontot, ta det lugnt, vi fixar nått för dig!</p>
  </div>

  <div className="swipeDiv">
    <img src={date} className="swipeContent swipeIcon"/>
    <h2 className="swipeHeader">Datum och tid</h2>
    <p className="swipeText">Du bestämmer självklart vilket datum och mellan vilka tider du vill göra din Dare.</p>
  </div>
  
  <div className="swipeDiv">
    <img src={match} className="swipeContent swipeIcon"/>
    <h2 className="swipeHeader">Vi matchar dig</h2>
    <p className="swipeText">Baserat på de val du gör så hittar vi en aktivitet för dig och matchar ihop dig med andra personer som vill göra samma sak.</p>
  </div>
 
  
</Slider>
    );
  }
}

export default SwipeSlider;