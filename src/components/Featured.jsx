// src/components/HeroSection.jsx (or wherever you prefer to put landing page sections)
import React, { useState, useEffect } from 'react';
import JBL from "../assets/JBL.png"

export default function Featured() {
  const calculateTimeLeft = () => {
    // Set your target date and time.
    // For this demo, I'm setting it to approx. 23 days, 5 hours, 59 minutes, 35 seconds from now
    // to match the numbers in your image.
    // In a real application, you would fetch a specific target date from your backend
    // or configure it to a product launch date.
    const now = new Date();
    const target = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 23, // Days
      now.getHours() + 5,  // Hours
      now.getMinutes() + 59, // Minutes
      now.getSeconds() + 35  // Seconds
    );

    const difference = +target - +now; // Difference in milliseconds
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      // If the countdown is finished
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    // Set up the timer to update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Clear the interval when the component unmounts to prevent memory leaks
    return () => clearInterval(timer);
  }, []); // Empty dependency array means this effect runs once on mount

  const timerComponents = [];

  // Define the order of the timer intervals as seen in your image
  const intervals = ['days', 'hours', 'minutes', 'seconds'];

  intervals.forEach((interval) => {
    // Only render if the value is defined (i.e., countdown is still active or initialized)
    if (timeLeft[interval] !== undefined) {
      timerComponents.push(
        <div
          key={interval}
          className="flex flex-col items-center justify-center bg-gray-800 text-white
                     rounded-xl p-4 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28
                     flex-shrink-0 transition-transform duration-300 hover:scale-105"
        >
          <span className="text-3xl sm:text-4xl font-bold">
            {/* Format numbers to always have two digits (e.g., 05 instead of 5) */}
            {String(timeLeft[interval]).padStart(2, '0')}
          </span>
          <span className="text-xs sm:text-sm mt-1 uppercase text-gray-400">
            {/* Display the interval name */}
            {interval}
          </span>
        </div>
      );
    }
  });


  return (
    // Main section container: full height, dark background, centered content
    <section className="bg-black text-white min-h-[calc(100vh-64px)] flex items-center justify-center
                        py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden mx-10 my-5">
      {/* Subtle radial gradient in the background for depth, like in the image */}
      <div className="absolute inset-0 opacity-50 pointer-events-none"
           style={{ background: 'radial-gradient(circle at 80% 50%, rgba(20, 20, 20, 0.5) 0%, rgba(0, 0, 0, 1) 70%)' }}></div>

      {/* Content wrapper: centers content, handles responsive stacking */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between
                      gap-12 w-full z-10"> {/* z-10 ensures content is above the background gradient */}

        {/* Left Content Area (Text, Countdown, Button) */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left p-4 sm:p-0">
          {/* "Categories" label */}
          <span className="text-emerald-400 text-lg font-semibold mb-3 tracking-wide uppercase">Categories</span>

          {/* "JOG !" text */}
          <p className="text-white text-base sm:text-xl font-bold mb-2">JOG !</p>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight mb-8">
            Enhance Your <br className="hidden sm:inline" /> Music Experience
          </h1>

          {/* Countdown Timer Display */}
          <div className="flex space-x-3 sm:space-x-4 mb-12">
            {/* Render timer components if time left, otherwise show "Countdown Finished!" */}
            {timerComponents.length > 0 ? timerComponents : (
              <span className="text-xl text-gray-400">Countdown Finished!</span>
            )}
          </div>

          {/* "Buy Now!" Button */}
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-12 rounded-full
                             text-xl shadow-lg transition-colors duration-300 transform hover:scale-105
                             focus:outline-none focus:ring-4 focus:ring-emerald-500 focus:ring-opacity-50">
            Buy Now!
          </button>
        </div>

        {/* Right Image Area */}
        <div className="relative w-full md:w-1/2 flex justify-center items-center mt-8 md:mt-0 p-4">
          {/* Replace this with your actual JBL Boombox 2 image URL */}
          <img
            src={JBL} // Assuming you place 'Frame 600.png' in your public folder
            alt="JBL Boombox 2 Speaker"
            className="w-full max-w-md md:max-w-xl object-contain drop-shadow-2xl" // Added drop-shadow for effect
          />
        </div>
      </div>
    </section>
  );
}
