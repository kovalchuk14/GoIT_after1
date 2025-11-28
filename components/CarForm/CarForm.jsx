'use client';

import { useState } from "react";
import * as Yup from "yup";
import css from "./CarForm.module.css";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  date: Yup.date(),
  comment: Yup.string().max(200, "Max 200 characters")
});

export default function CarForm() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    date: "",
    comment: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(values, { abortEarly: false });
      setErrors({});

      // ---- SUCCESS ACTION ----
      alert("Car booked successfully!");

    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const newErrors = {};
        err.inner.forEach((e) => {
          if (e.path) newErrors[e.path] = e.message;
        });
        setErrors(newErrors);
      }
    }
  };

    return (
        <form onSubmit={handleSubmit} className={css.form}>
            <div>
                <p className={css.formTitle}>Book your car now</p>
                <p className={css.formText}>Stay connected! We are always ready to help you.</p>
            </div>
            <div className={css.formInputContainer}>

                <input className={css.formInput} name="name" value={values.name} onChange={handleChange} placeholder="Name*" />
                {errors.name && <p>{errors.name}</p>}

                <input className={css.formInput} name="email" value={values.email} onChange={handleChange} placeholder="Email*" />
                {errors.email && <p>{errors.email}</p>}

                <DatePicker
                    selected={values.date}
                    onChange={(value) => setDate(value)}
                    placeholderText="Booking date"
                    className={css.formInput}      
                    calendarClassName={css.calendar} 
                />

                <textarea className={css.formInput} name="comment" value={values.comment} onChange={handleChange} placeholder="Comment" />
                {errors.comment && <p>{errors.comment}</p>}
            </div>

            <button className={css.formButton} type="submit">Send</button>

        </form>
    );
}
