import React from 'react';
import slider1 from '../../Assets/Img/slider-image-1.jpeg';
import slider2 from '../../Assets/Img/slider-image-2.jpeg';
import slider3 from '../../Assets/Img/slider-image-3.jpeg';
import blog1 from '../../Assets/Img/blog-img-1.jpeg';
import blog2 from '../../Assets/Img/blog-img-2.jpeg';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 
import "./MainSlider.css"; // استايل مخصص

export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: true,
  };

  return (
    <div className="main-slider container my-5 pt-5">
      <div className="row gx-3">
        {/* السلايدر الرئيسي */}
        <div className="col-md-9">
          <div className="slider-wrapper shadow rounded-3 overflow-hidden">
            <Slider {...settings}>
              <img height={400} className="w-100 slider-img" src={slider1} alt="slider1" />
              <img height={400} className="w-100 slider-img" src={slider2} alt="slider2" />
              <img height={400} className="w-100 slider-img" src={slider3} alt="slider3" />
            </Slider>
          </div>
        </div>

        {/* الصور الجانبية */}
        <div className="col-md-3 d-flex flex-column gap-3">
          <div className="side-img shadow rounded-3 overflow-hidden">
            <img height={200} className="w-100" src={blog1} alt="blog1" />
          </div>
          <div className="side-img shadow rounded-3 overflow-hidden">
            <img height={200} className="w-100" src={blog2} alt="blog2" />
          </div>
        </div>
      </div>
    </div>
  );
}
