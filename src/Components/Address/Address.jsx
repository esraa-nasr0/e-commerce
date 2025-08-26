import { useFormik } from 'formik';
import React, { useContext } from 'react';
import style from './Address.module.css';
import { CartContext } from '../../Context/CartContext';

export default function Address() {
  let { OnlonePayment, cartId } = useContext(CartContext);

  async function handleAddressSubmit(values) {
    let response = await OnlonePayment(cartId, values);
    console.log(response?.data.session.url);
    window.location.href = response?.data.session.url;
  }

  let formik = useFormik({
    initialValues: {
      details: '',
      phone: '',
      city: '',
    },
    onSubmit: handleAddressSubmit,
  });

  return (
    <div className={style.body}>
      <div className={style.formContainer}>
        <h2 className={style.title}>📝 Shipping Address</h2>
        <form onSubmit={formik.handleSubmit} className={style.form}>
          <label htmlFor="details">Details</label>
          <input
            value={formik.values.details}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            className={style.input}
            name="details"
            id="details"
            placeholder="Street, Building, etc."
          />

          <label htmlFor="phone">Phone</label>
          <input
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="tel"
            className={style.input}
            name="phone"
            id="phone"
            placeholder="+20 123 456 7890"
          />

          <label htmlFor="city">City</label>
          <input
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            className={style.input}
            name="city"
            id="city"
            placeholder="Cairo"
          />

          <button type="submit" className={style.payBtn}>
            💳 Pay Now
          </button>
        </form>
      </div>
    </div>
  );
}
