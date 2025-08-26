import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function CategorySlider() {
  var settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 2000,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
    ],
  };

  function getCategorys() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }

  let { data } = useQuery("CategorySlider", getCategorys);

  return (
    <div className="py-5 bg-light">
      <div className="container">
        <h2 className="fw-bold text-center mb-4" style={{ color: "#28a745" }}>
          Shop by Category
        </h2>
        {data?.data.data ? (
          <Slider {...settings}>
            {data?.data.data.map((category) => (
              <div key={category._id} className="px-2">
                <div
                  className="category-card shadow-sm rounded-3 p-3 text-center bg-white"
                  style={{
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    cursor: "pointer",
                  }}
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="img-fluid rounded-3 mb-2"
                    style={{ height: "150px", objectFit: "cover", width: "100%" }}
                  />
                  <h6 className="mt-2 text-dark">{category.name}</h6>
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <p className="text-center text-muted">Loading categories...</p>
        )}
      </div>
    </div>
  );
}
