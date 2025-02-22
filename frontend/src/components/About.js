'use client';
import { useState } from 'react';
import Link from 'next/link';
import styles from './About.module.css';

const About = () => {
  const [isHovered, setIsHovered] = useState(false);

  // Dynamic content (could be fetched from an API or CMS in a real-world app)
  const dynamicContent = {
    motto: "Empowering Health, Anytime, Anywhere",
    description:
      "Welcome to our telemedicine platform! Connect with doctors, manage your health, and save time with virtual consultations. It's healthcare at your fingertips.",
    buttons: [
      { text: "Log In", link: "/login" },
      { text: "Sign Up", link: "/signup" },
    ],
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>{dynamicContent.motto}</h1>
      <p className={styles.description}>{dynamicContent.description}</p>

      <div className={styles.buttons}>
        {dynamicContent.buttons.map((button, index) => (
          <Link href={button.link} key={index}>
            <button
              className={`${styles.button} ${isHovered ? styles.hovered : ''}`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              aria-label={button.text}
            >
              {button.text}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default About;