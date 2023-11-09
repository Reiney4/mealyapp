import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './styles.css'; 
import Modal from './Modal.js'; 


const Dashboard = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [showModal, setShowModal] = useState(false);

  const handleGetStartedClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <header>
        <h1>Mealy</h1>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            {/* <li><a href="/menu">Menu</a></li> */}
            <li><a href="/how-it-works">How it Works</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </nav>
      </header>

      <main>
        {!isAuthenticated ? (
          <>
            <section className="hero">
              <h2>Delicious Meals, Just a Click Away!</h2>
              <p>From local delicacies to international cuisines, get everything delivered to your doorstep.</p>
              <div className="search-bar">
                <input type="text" placeholder="What are you craving today?" />
                <button>Search</button>
              </div>
              <button onClick={handleGetStartedClick} className="cta-button">Get Started</button>
            </section>

            <section className="services">
              <h3>Why Choose Mealy?</h3>
              <ul>
                <li>
                  <img src="https://tse1.mm.bing.net/th?id=OIP.8P8WX97EK13qNSGhTgG1GgHaDz&pid=Api&P=0&h=220" />
                  <h4>Speedy Delivery</h4>
                  <p>No more long waits. Get your food while it's hot!</p>
                </li>
                <li>
                  <img src="https://tse3.mm.bing.net/th?id=OIP.vQKTHgt8oGu0B6kR75WfowHaHa&pid=Api&P=0&h=220"  />
                  <h4>Diverse Menu</h4>
                  <p>Explore a range of cuisines from around the world.</p>
                </li>
                <li>
                  <img src="https://tse4.mm.bing.net/th?id=OIP.zr9VEm2b-CjYieER1pkcbQHaHa&pid=Api&P=0&h=220"/>
                  <h4>Eco-Friendly Packaging</h4>
                  <p>We care about the planet as much as you do.</p>
                </li>
              </ul>
            </section>

            <section className="top-restaurants">
  <h3>Top Carteres</h3>
  <ul>
    <li>
      <div className="item">
        <img src="https://tse3.mm.bing.net/th?id=OIP.AwjQVCDKeX2aaDhTBeQ6DgHaEo&pid=Api&P=0&h=220"  />
        <p>MEAT N GRILL</p>
      </div>
    </li>
    <li>
      <div className="item">
        <img src="https://tse3.mm.bing.net/th?id=OIP.Q-3AspQ9hlA-RdplJ9fnJgHaEc&pid=Api&P=0&h=220"  />
        <p>SHAWAL'S DELI</p>
      </div>
    </li>
    <li>
      <div className="item">
        <img src="https://tse1.mm.bing.net/th?id=OIP.bQbm_fnJ1D0eDYXfjt4v0gHaFj&pid=Api&P=0&h=220"  />
        <p>BIG FISH</p>
      </div>
    </li>
    {/* Add more items as needed */}
  </ul>
  <a href="/Cateres">See More</a>
</section>

<section className="top-categories">
  <h3>Top Categories</h3>
  <ul>
    <li>
      <div className="item">
        <img src="https://tse2.mm.bing.net/th?id=OIP.J6jbMEWgKLP1BbCpMGYu3gHaE8&pid=Api&P=0&h=220"  />
        <p>Italian</p>
      </div>
    </li>
    <li>
      <div className="item">
        <img src="https://tse3.mm.bing.net/th?id=OIP.9BOhPjMnGDigfQtjcM5YiQHaFj&pid=Api&P=0&h=220"  />
        <p>Mexican</p>
      </div>
    </li>
    <li>
      <div className="item">
        <img src="https://tse3.mm.bing.net/th?id=OIP.avzFyzWl0pCBMIhzEH59twHaFU&pid=Api&P=0&h=220"  />
        <p>Chinese</p>
      </div>
    </li>
    {/* Add more items as needed */}
  </ul>
  <a href="/categories">See More</a>
</section>

          </>
        ) : (
          <p>Welcome back! Here are your dashboard details...</p>
        )}

        {showModal && (
          <Modal onClose={handleCloseModal}>
            <h2>Welcome</h2>
            <p>Continue with one of the following options</p>
            <button onClick={() => window.location.href = "/register"}>Google</button>
            <button onClick={() => window.location.href = "/register"}>Facebook</button>
            <button onClick={() => window.location.href = "/register"}>Email</button>
            <button onClick={handleCloseModal}>Skip for Now</button>
            <p>By creating an account, you automatically accept our Terms of Service, Privacy Policy, and Cookies Policy.</p>
          </Modal>
        )}
      </main>

      <footer>
        <p>&copy; 2023 Mealy. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;