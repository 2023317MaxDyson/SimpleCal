/* import { useState, useEffect } from "react"; */
import { useNavigate } from "react-router-dom";
function Home() {

  /*
 const screenshots = [

  ];

  const [currentImage, setCurrentImage] = useState(0);*/

  const navigate = useNavigate();
  return (
    <div className="home">
      <div className="home-header">
        <div className="home-logo">
          <span className="material-symbols-outlined">
            calendar_month
          </span>
          <p>SimpleCal</p>
        </div>
        <div>
          <button onClick={() => navigate("/login")}>
            Login
          </button>
          <button onClick={() => navigate("/signup")}>
            Sign Up
          </button>
        </div>
      </div>
      <div className="home-herosection">
        <img className="home-herosection-img" src="http://localhost:3000/img/HeroSection.png" alt="Hero Section" />
        <div>
          <h1> Plan your day, stay organized, and{" "} <span className="home-stress">stress less</span> </h1>
          <p> Manage your events, tasks, and appointments in one simple calendar. Stay organized, keep track of what matters, and take control of your day. </p>
          <button onClick={() => navigate("/signup")}>
            Signup Today!!
          </button>
        </div>
      </div>
      <div className="home-featurecards">
        <div className="home-card">
          <span className="material-symbols-outlined"> event_note </span>
          <h2>Plan With Ease</h2>
          <p> Create and manage events, tasks, and appointments while keeping your schedule organized in one place. </p>
        </div> <div className="home-card2">
          <span className="material-symbols-outlined"> calendar_month </span> <h2>Stay Organized</h2>
          <p> See everything on your calendar and easily keep track of your daily, weekly, and monthly schedule. </p>
        </div>
        <div className="home-card3"> <span className="material-symbols-outlined"> task_alt </span>
          <h2>Keep On Track</h2>
          <p> Keep important tasks and appointments in sight so you can stay focused and never lose track of what needs to be done. </p>
        </div>
      </div>
      <div className="how-it-works-section">
        <img src="..." alt="How it Works" />
        <div>
          <button> </button>
          <button>  </button>
          <button>  </button>
         <button>  </button>
        </div>
      </div>
      <div className="testimonials">

      </div>
      <footer>
        <p> © 2026 SimpleCal <br />
          Created by Max Dyson
          <br />
          https://github.com/2023317MaxDyson/SimpleCal
        </p>
        <p>
          <b>  About </b>
          <br />
          SimpleCal is a calendar application that helps <br />
          users organize events, track schedules, and <br />
          manage their time efficiently.
        </p>
      </footer>
    </div>
  );

}


export default Home;