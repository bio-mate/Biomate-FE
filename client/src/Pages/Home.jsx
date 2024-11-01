import React from "react";
import "../styles/LandingPage.css"; // Custom styles
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate()
  const handleClick = ()=>{
    navigate(`/login`)
  }
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section d-flex align-items-center justify-content-center">
        <div className="container text-center">
          <h1 className="display-3 text-white fw-bold">
            Welcome to <span class="highlight">BioMate</span>
          </h1>
          <p className="lead text-white-50 mb-4">
            Your Personalized Wedding Biodata Solution. Start your journey with
            BioMate today, and create a biodata that tells your story
            beautifully.
          </p>
          <p className="lead text-white-50 mb-4">
            Say goodbye to the traditional, outdated paper biodata.
          </p>
          <button onClick={handleClick} className="btn btn-gradient btn-lg shadow-lg">
            Create your Biodata
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section py-5">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold">Why Choose Our App</h2>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card feature-card text-center p-4 h-100 shadow-sm">
                <i className="bi bi-shield-lock display-4 text-gradient mb-3"></i>
                <h5 className="fw-bold">Personalized Website</h5>
                <p className="text-muted">
                  Create your own custom biodata website, uniquely tailored to
                  you and your story.
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card feature-card text-center p-4 h-100 shadow-sm">
                <i className="bi bi-speedometer display-4 text-gradient mb-3"></i>
                <h5 className="fw-bold">Add Photos and Videos</h5>
                <p className="text-muted">
                  Showcase your life, hobbies, and personality with multimedia
                  options to create a memorable profile.
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card feature-card text-center p-4 h-100 shadow-sm">
                <i className="bi bi-phone display-4 text-gradient mb-3"></i>
                <h5 className="fw-bold">Editable Anytime</h5>
                <p className="text-muted">
                  Update your biodata anytime as your life changes or new
                  details arise.
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card feature-card text-center p-4 h-100 shadow-sm">
                <i className="bi bi-phone display-4 text-gradient mb-3"></i>
                <h5 className="fw-bold">Profile Sharing</h5>
                <p className="text-muted">
                  Share your biodata website instantly with family, friends, and
                  potential matches via a simple link.
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card feature-card text-center p-4 h-100 shadow-sm">
                <i className="bi bi-phone display-4 text-gradient mb-3"></i>
                <h5 className="fw-bold">Easy-to-Use Interface</h5>
                <p className="text-muted">
                  No design skills required! Our user-friendly platform guides
                  you through every step.
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card feature-card text-center p-4 h-100 shadow-sm">
                <i className="bi bi-phone display-4 text-gradient mb-3"></i>
                <h5 className="fw-bold">Secure & Private</h5>
                <p className="text-muted">
                  Your personal details are protected with top-level security to
                  ensure your privacy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* App Screenshots Section */}
      <section className="screenshots-section py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold">App Screenshots</h2>
          <div className="row">
            <div className="col-md-4 mb-4">
              <img
                src="/iphone-feature-01.png"
                alt="Screenshot 1"
                className="img-fluid rounded shadow-lg"
              />
            </div>
            <div className="col-md-4 mb-4">
              <img
                src="/iphone-feature-01.png"
                alt="Screenshot 2"
                className="img-fluid rounded shadow-lg"
              />
            </div>
            <div className="col-md-4 mb-4">
              <img
                src="/iphone-feature-01.png"
                alt="Screenshot 3"
                className="img-fluid rounded shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section class="how-it-works">
        <h2>How It Works</h2>
        <div class="steps">
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3 class="step-title">Sign Up</h3>
              <p>
                Create an account by providing basic information like
                your name, email, and mobile number.
              </p>
            </div>
          </div>

          <div class="step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3 class="step-title">Fill In Your Details</h3>
              <p>
                Add personal information such as family background,
                education, career, and hobbies.
              </p>
            </div>
          </div>

          <div class="step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3 class="step-title">Customize Your Biodata</h3>
              <p>
                Choose from beautiful templates and personalize them
                with your preferred colors, fonts, and photos.
              </p>
            </div>
          </div>

          <div class="step">
            <div class="step-number">4</div>
            <div class="step-content">
              <h3 class="step-title">Preview & Publish</h3>
              <p>
                Review your biodata, make any final adjustments, and
                publish your website!
              </p>
            </div>
          </div>

          <div class="step">
            <div class="step-number">5</div>
            <div class="step-content">
              <h3 class="step-title">Share with Ease</h3>
              <p>
                Once your biodata is live, share it via a custom URL
                with friends, family, and potential matches.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="cta-section text-center text-white py-5">
        <div className="container">
          <h2 className="mb-4 display-6">Thank You for Choosing BioMate</h2>
          <p className="lead mb-5">
            {" "}
            We are excited to be part of your journey! Whether you're just
            beginning your search or you're in the final stages of planning,
            BioMate is here to make your experience effortless and special. We
            wish you all the best as you embark on this beautiful new chapter in
            your life.
          </p>
          <a href="#download" className="btn btn-lg btn-gradient shadow-lg">
            Download Now
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-section bg-dark text-white text-center py-4">
        <div className="container">
          <p>&copy; 2024 Your Biomate. All Rights Reserved.</p>
          <div className="social-icons mt-3">
            <a href="#" className="text-white mx-2">
              <i className="bi bi-facebook"></i>
            </a>
            <a href="#" className="text-white mx-2">
              <i className="bi bi-twitter"></i>
            </a>
            <a href="#" className="text-white mx-2">
              <i className="bi bi-instagram"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
