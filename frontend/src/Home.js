import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import './assets/styles/Home.css';  // Ensure the path is correct and matches your file structure

// Import images from assets/images folder
// Import images from assets/images folder
import carousel1 from './assets/Images/medium.jpg';
import carousel2 from './assets/Images/receive.jpg'; 
import carousel3 from './assets/Images/carousel_compost.jpg';
import carousel4 from './assets/Images/carousal_animall.jpg';
//import carousel5 from './assets/Images/carousel_volunteer.jpg';
import logo from './assets/Images/Surplus3.png';  // Import your logo image  // Import your logo image
import hungerFreeImage from './assets/Images/hunger-free-image.jpg';  // Add the image for this section
import missionImage from './assets/Images/mission-image.jpg';  // Add the image for the mission section
import differenceImage from './assets/Images/difference-image.jpg';  // Add the image for the "Together" section

const Home = () => {
  return (
    <div>
      {/* Navbar Section */}
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="SurplusServe Logo" className="logo" />
          </Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto"> 
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Carousel Section */}
      <Carousel 
        interval={500}  // Faster transition (0.5 seconds)
        fade             // Smooth fade transition
        pause="hover"    // Pause on hover for better user control
        indicators={false}  // Optional: Disable carousel indicators for a cleaner look
        nextIcon={<span className="carousel-control-next-icon" />}  // Custom next icon style
        prevIcon={<span className="carousel-control-prev-icon" />}  // Custom previous icon style
      >
        <Carousel.Item key="carousel1">
          <img className="d-block w-100" src={carousel1} alt="Donate Surplus Food" />
          <Carousel.Caption>
            <h3>Donate Surplus Food</h3>
            <p>Provide food donations from events, restaurants, or your home to help those in need.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item key="carousel2">
          <img className="d-block w-100" src={carousel2} alt="Receive Surplus Food" />
          <Carousel.Caption>
            <h3>Receive Surplus Food</h3>
            <p>Find available surplus food near you and help feed those who need it the most.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item key="carousel3">
          <img className="d-block w-100" src={carousel3} alt="Composting Facilities" />
          <Carousel.Caption>
            <h3>Composting Facilities</h3>
            <p>Leftover food scraps can be composted to create valuable organic fertilizer for gardens and farms.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item key="carousel4">
          <img className="d-block w-100" src={carousel4} alt="Animal Feed" />
          <Carousel.Caption>
            <h3>Animal Feed</h3>
            <p>Surplus food can also be repurposed as animal feed, helping reduce food waste and supporting animal welfare.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* Hunger-Free, Waste-Free World Section */}
      <section className="hunger-free-section">
        <div className="container d-flex align-items-center">
          <div className="row w-100">
            <div className="col-md-6">
              <img src={hungerFreeImage} alt="Hunger-Free, Waste-Free World" className="img-fluid" />
            </div>
            <div className="col-md-6">
              <h2>A Hunger-Free, Waste-Free World</h2>
              <p>We dream of a future where no food goes to waste and no one goes hungry. By building a sustainable network of donors, and recipients, we bring communities together to make this vision a reality.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="mission-section">
        <div className="container d-flex align-items-center">
          <div className="row w-100">
            <div className="col-md-6">
              <img src={missionImage} alt="Our Mission" className="img-fluid" />
            </div>
            <div className="col-md-6">
              <h2>Our Mission: Turning Surplus into Support</h2>
              <p>At SurplusServe, our mission is to minimize food wastage while addressing hunger. Every plate of surplus food matters, and we ensure it reaches someone in need. Contribute to a greener planet through composting and animal feeding initiatives.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Together, We Make the Difference Section */}
      <section className="difference-section">
        <div className="container d-flex align-items-center">
          <div className="row w-100">
            <div className="col-md-6">
              <img src={differenceImage} alt="Together, We Make the Difference" className="img-fluid" />
            </div>
            <div className="col-md-6">
              <h2>Together, We Make the Difference</h2>
              <p>Your contribution—big or small—has the power to change lives. By working together, we can ensure that no food is wasted, and every meal finds a purpose.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements and Rewards Section */}
      <section className="achievements-section">
        <div className="container text-center">
          <h2>Achievements and Rewards: Celebrate Every Contribution</h2>
          <p>
            At SurplusServe, we believe in recognizing and rewarding the efforts 
            of our donors. Your actions make a tangible difference, 
            and we ensure they don’t go unnoticed!
          </p>
          <div className="row mt-4">
            <div className="col-md-6">
              <div className="info-box p-4 donor-box">
              <ul>
                <h3>For Our Donors</h3>
                
                <p>Make every donation count and earn badges that reflect your impact:</p>
                
                  <li>🏆 <strong>Top Contributor:</strong> Recognized for outstanding generosity.</li>
                  <li>🍽 <strong>100 Meals Donated:</strong> Celebrate a major milestone in sharing food.</li>
                  <li>🎁 <strong>Monthly Rewards:</strong> The top donor of the month receives a special gift as our token of appreciation.</li>
                
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <p>&copy; 2024 SurplusServe. All rights reserved.</p>
        <ul>
          <li><Link to="/terms">Terms of Service</Link></li>
          <li><Link to="/privacy">Privacy Policy</Link></li>
        </ul>
      </footer>
    </div>
  );
};

export default Home;