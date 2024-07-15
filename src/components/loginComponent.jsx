import React, { useState, useEffect } from 'react';
import styles from "../styles/login.module.css";
import cover1 from "../assets/piggybank.png";
import cover2 from "../assets/piggybank2.png";
import icon from "../assets/MoneyMaps.png";
import AppLoader from './loader';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { pushUserData } from '../features/MoneyMapFeatures/appSlicer';
import firebaseApp from "../app/firebase";
import { fetchUserTransactions } from '../features/MoneyMapFeatures/appSlicer';
import { getUserTransactions } from '../features/MoneyMapFeatures/appSlicer';
function LoginComponent() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(false); // State to control loader display
  const [username, setUserEmail] = useState('');
  const [password, setUserPassword] = useState('');
  const auth = getAuth(firebaseApp);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Slides for the image slider
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

  // Function to handle login form submission
  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true); // Set loading to true
    try {
      // Authenticate user using Firebase
      await signInWithEmailAndPassword(auth, username, password);
      const currentUser = auth.currentUser;
      dispatch(pushUserData({ username: username, password: passwordVisible }));
      let data = await dispatch(fetchUserTransactions())
      if(data.payload){
        dispatch(getUserTransactions({ userTransaction : data.payload }));
      }
      if (currentUser) {
        navigate("/home");
      } else {
        toast.error("Incorrect user or password");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false); // Set loading to false after operation is complete
    }
  };

  return (
    <div className={styles.container}>
      <Toaster /> {/* Toast notifications container */}
      <div className={styles['left-half']}>
        <div className={styles["icon-div"]}>
          <img src={icon} alt="Icon" />
        </div>
        <h1>Hello, Welcome Back!</h1>
        <p>Please sign in to your account</p>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={username}
            onChange={(e) => setUserEmail(e.target.value)}
          />
          <div className={styles['password-container']}>
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setUserPassword(e.target.value)}
              className={styles['password-input']}
            />
            <div
              className={styles['eye-icon']}
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? '👁️' : '👁️‍🗨️'}
            </div>
          </div>
          <button type="submit">Login</button>
        </form>
        <p className={styles['paragraph-signup']}>Don't have an account? <span>Sign Up</span></p>
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
