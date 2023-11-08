// src/components/Layout/Footer.js

import React from 'react';
import mockData from '../../mockData'; 


const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div>
        <p>
          © {year} Mealy. All rights reserved.
        </p>
        <section>
          <div>
            <h4>Contact Us</h4>
            <ul>
              <li>Email: contact@mealy.com</li>
              <li>Phone: 123-456-7890</li>
            </ul>
          </div>
          <div>
            <h4>Follow Us</h4>
            <ul>
              <li><a href="https://www.facebook.com/Mealy">Facebook</a></li>
              <li><a href="https://www.twitter.com/Mealy">Twitter</a></li>
              {/* other social links if necessary */}
            </ul>
          </div>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
