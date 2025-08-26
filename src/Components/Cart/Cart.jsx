import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import style from "./Cart.module.css";
import { DNA } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { FaCreditCard, FaMoneyBillWave } from "react-icons/fa";

export default function Cart() {
  let { getLoggedUserCart, removeCartItem, updateProductQuantity } =
    useContext(CartContext);
  const [cartDetails, setCartDetails] = useState(null);

  async function updateCount(id, count) {
    let { data } = await updateProductQuantity(id, count);
    setCartDetails(data);
  }

  async function removeItem(id) {
    let { data } = await removeCartItem(id);
    setCartDetails(data);
  }

  async function getCart() {
    let { data } = await getLoggedUserCart();
    setCartDetails(data);
  }

  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      <h2 className={style.pageTitle}>🛒 Your Shopping Cart</h2>

      {cartDetails ? (
        <div className={style.cartContainer}>
          {cartDetails.data.products.length > 0 ? (
            <>
              <div className={style.cartHeader}>
                <p>
                  <strong>Items:</strong> {cartDetails.numOfCartItems}
                </p>
                <p>
                  <strong>Total:</strong> {cartDetails.data.totalCartPrice} EGP
                </p>
              </div>

              {cartDetails.data.products.map((product) => (
                <div key={product.product.id} className={style.cartItem}>
                  <img
                    src={product.product.imageCover}
                    alt={product.product.title}
                    className={style.productImage}
                  />

                  <div className={style.itemDetails}>
                    <h5>
                      {product.product.title
                        .split(" ")
                        .slice(0, 3)
                        .join(" ")}
                    </h5>
                    <p className={style.price}>💰 {product.price} EGP</p>
                  </div>

                  <div className={style.actions}>
                    <div className={style.quantity}>
                      <button
                        onClick={() =>
                          updateCount(product.product.id, product.count - 1)
                        }
                      >
                        -
                      </button>
                      <span>{product.count}</span>
                      <button
                        onClick={() =>
                          updateCount(product.product.id, product.count + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(product.product.id)}
                      className={style.removeBtn}
                    >
                      ❌ Remove
                    </button>
                  </div>
                </div>
              ))}

              <div className={style.checkout}>
                <Link to="/Address" className={style.payBtn}>
                  <FaCreditCard style={{ marginRight: "6px" }} />
                  Online Payment
                </Link>
                <button className={style.cashBtn}>
                  <FaMoneyBillWave style={{ marginRight: "6px" }} />
                  Cash On Delivery
                </button>
              </div>
            </>
          ) : (
            <div className={style.emptyCart}>
              <p>Your cart is empty 🛒</p>
            </div>
          )}
        </div>
      ) : (
        <section className={style.loading}>
          <DNA visible={true} height="80" width="80" ariaLabel="dna-loading" />
        </section>
      )}
    </>
  );
}
