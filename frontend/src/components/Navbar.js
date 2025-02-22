import Link from 'next/link';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.title}>Telemedicine Platform</div>
      <div className={styles.left}>
        <button className={styles.btn}>Log In</button>
        <button className={styles.btn}>Sign Up</button>
      </div>
    </nav>
  );
};

export default Navbar;