import axios from "axios";
import React, { useContext } from "react";
import { useQuery } from "react-query";
import { DNA } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import "./FeaturedProducts.css";

export default function FeaturedProducts() {
  let { addToCart } = useContext(CartContext);

  async function addProductToCart(id) {
    let response = await addToCart(id);
    if (response.data.status === "success") {
      toast.success("✅ Product Successfully Added");
    } else {
      toast.error("❌ Error Adding Product");
    }
  }

  function getFeaturedProduct() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  let { isLoading, data } = useQuery("featuredproduct", getFeaturedProduct, {
    cacheTime: 3000,
    refetchInterval: 5000,
  });

  return (
    <>
      {isLoading ? (
        <div className="w-100 py-5 d-flex justify-content-center">
          <DNA visible={true} height="80" width="80" ariaLabel="dna-loading" />
        </div>
      ) : (
        <div className="container py-4">
          <h1 className="text-center mb-4 text-success fw-bold">
            🌿 Featured Products
          </h1>
          <div className="row g-4">
            {data?.data.data.map((product) => (
              <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                <div className="product-card">
                  <Link
                    to={`/ProductDetails/${product.id}`}
                    className="product-link"
                  >
                    <div className="p-3 text-center">
                      <img
                        className="product-img mb-3"
                        src={product.imageCover}
                        alt={product.title}
                      />
                      <span className="text-success fw-semibold small d-block mb-2">
                        {product.category.name}
                      </span>
                      <h3 className="h6 text-dark fw-bold">
                        {product.title.split(" ").slice(0, 2).join(" ")}
                      </h3>
                      <div className="d-flex justify-content-between mt-2">
                        <span className="fw-bold text-success">
                          {product.price} EGP
                        </span>
                        <span>
                          <i className="fas fa-star text-warning"></i>{" "}
                          {product.ratingsAverage}
                        </span>
                      </div>
                    </div>
                  </Link>
                  <button
                    onClick={() => addProductToCart(product.id)}
                    className="btn btn-success w-100 mt-auto"
                  >
                    + Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
