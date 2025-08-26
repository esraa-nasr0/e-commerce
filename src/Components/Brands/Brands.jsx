import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBrand } from '../../Redux/BrandSlice';
import { DNA } from 'react-loader-spinner';

export default function Brands() {
  let { loading, isError, brand } = useSelector((state) => state.brand);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBrand());
  }, [dispatch]);

  return (
    <div className="container mt-5 py-5">
      <h2 className="text-center fw-bold mb-4">Our Brands</h2>

      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
          <DNA
            visible={true}
            height="100"
            width="100"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
        </div>
      ) : (
        <div className="row g-4 justify-content-center">
          {brand.map((brands, index) => (
            <div key={index} className="col-6 col-sm-4 col-md-3 col-lg-2">
              <div
                className="card border-0 shadow-sm text-center h-100 p-3 brand-card"
                style={{
                  borderRadius: "16px",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  cursor: "pointer",
                }}
              >
                <img
                  src={brands.image}
                  alt={brands.name}
                  className="w-100 mb-3"
                  style={{ height: "120px", objectFit: "contain" }}
                />
                <h6 className="fw-semibold">{brands.name}</h6>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
