import React, { useState, useEffect } from 'react';
import styles from "../styles/login.module.css";
import cover1 from "../assets/piggybank.png";
import cover2 from "../assets/piggybank2.png";
import icon from "../assets/MoneyMaps.png";
import AppLoader from './loader';

function LoginComponent() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(false); // State to control loader display

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const slides = [cover1, cover2];

  // Function to go to the next slide
  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % slides.length);
  };

  // Function to go to the previous slide
  const prevSlide = () => {
    setCurrentSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  // Automatically change slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((currentSlide + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds (5000 milliseconds)

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [currentSlide, slides.length]);

  // Function to show loader
  const showLoader = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false); // Simulate loading completion after some time
    }, 3000); // Simulate loading for 3 seconds (adjust as needed)
  };

  return (
    <div className={styles.container}>
      <div className={styles['left-half']}>
        <div className={styles["icon-div"]}>
          <img src={icon} alt="Icon" />
        </div>
        <h1>Hello, Welcome Back!</h1>
        <p>Please sign in to your account</p>
        <form>
          <input type="email" placeholder="Email" />
          <div className={styles['password-container']}>
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              className={styles['password-input']}
            />
            <div
              className={styles['eye-icon']}
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? '👁️' : '👁️‍🗨️'}
            </div>
          </div>
          <button type="button" onClick={showLoader}>Login</button> {/* Use type="button" to prevent form submission */}
        </form>
        <p>Don't have an account? <span>Sign Up</span></p>
      </div>
      <div className={styles['right-half']}>
        <div className={styles['slider']}>
          <button className={styles['slider-button']} onClick={prevSlide}>‹</button>
          <div className={styles['image-card']}>
            <img src={slides[currentSlide]} alt="Slider" />
          </div>
          <button className={styles['slider-button']} onClick={nextSlide}>›</button>
        </div>
      </div>
      {isLoading && <AppLoader />} {/* Render loader conditionally based on isLoading state */}
    </div>
  );
}

export default LoginComponent;
