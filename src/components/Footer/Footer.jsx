import React from 'react';
import './Footer.css';
const Footer = () => {
    const copyrightYear = new Date().getFullYear();
  return (
    <div className='footer'>
        <div className='footer-wrapper'>
            <p>Faculty of Arts Electoral System powered by Hintlord. Copyright {copyrightYear}.</p>
        </div>
    </div>
  );
}

export default Footer;