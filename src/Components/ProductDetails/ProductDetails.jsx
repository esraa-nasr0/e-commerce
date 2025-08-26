import axios from "axios";
import React from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Slider from "react-slick";

export default function ProductDetails() {
  var settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  let Params = useParams();
  function getProductDetails(id) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  let { data } = useQuery("ProductDetails", () =>
    getProductDetails(Params.id)
  );

  return (
    <>
      {data?.data.data ? (
        <div className="container-fluid min-vh-100 mt-4 d-flex align-items-center justify-content-center">
          <Helmet>
            <meta name="description" content="" />
            <title>{data?.data.data.title}</title>
          </Helmet>

          <div className="row g-4 align-items-center shadow rounded-3 p-4 bg-white"
               style={{ maxWidth: "1100px" }}>
            {/* Left Side - Images */}
            <div className="col-md-5">
              <Slider {...settings}>
                {data?.data.data.images.map((img, idx) => (
                  <div key={idx} className="p-2">
                    <img
                      alt={data?.data.data.title}
                      src={img}
                      className="w-100 rounded-3 shadow-sm"
                      style={{ height: "350px", objectFit: "cover" }}
                    />
                  </div>
                ))}
              </Slider>
            </div>

            {/* Right Side - Details */}
            <div className="col-md-7">
              <h2 className="fw-bold text-success mb-3">
                {data?.data.data.title}
              </h2>
              <p className="text-muted">{data?.data.data.description}</p>
              <h6 className="mb-2">
                <span className="fw-semibold text-dark">Category:</span>{" "}
                <span className="text-success">
                  {data?.data.data.category?.name}
                </span>
              </h6>
              <h5 className="fw-bold text-success mb-3">
                {data?.data.data.price} EGP
              </h5>

              <div className="d-flex justify-content-between align-items-center border-top pt-3">
                <span className="text-muted">
                  {data?.data.data.ratingsQuantity} Reviews
                </span>
                <span className="fw-semibold text-dark">
                  <i className="fas fa-star text-warning"></i>{" "}
                  {data?.data.data.ratingsAverage}
                </span>
              </div>

              <button className="btn btn-success w-100 mt-4 py-2 fw-semibold rounded-3 shadow-sm">
                <i className="fas fa-cart-plus me-2"></i> Add to Cart
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
