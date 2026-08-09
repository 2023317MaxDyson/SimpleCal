import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Home() {
  const screenshots = [
     
  ];
  const [currentImage, setCurrentImage] = useState(0);


  const navigate = useNavigate();
  return (
    <div className="home">
      <div className="home-header">
        <span className="material-symbols-outlined">
          calendar_month
        </span>
        <p>SimpleCal</p>
        <button onClick={() => navigate("/login")}>
          Login
        </button>
        <button onClick={() => navigate("/signup")}>
          Sign Up
        </button>
      </div>
      <div className="home-herosection">
        <img className="home-herosection-img" src="http://localhost:3000/img/herosection.jpg" alt="Hero Section" />
        <h1> Make planning easy, enjoyable, and <span className="home-stress">stress free.</span></h1>
        <p> Plan smarter, stay on top of every event, and spend less time worrying about your schedule. </p>
        <button onClick={() => navigate("/signup")}>
          Signup Today!!
        </button>
      </div>
      <div className="home-featurecards">
        <div className="home-card">
          <h2> Smart Scheduling</h2>
          <span class="material-symbols-outlined">
            note_alt
          </span>
          <p>
            Create events, organize your day, and never miss an important
            appointment.
          </p>
        </div>
        <div className="home-card2">
          <span class="material-symbols-outlined">
            event
          </span>
          <h2> Stay Organized</h2>
          <p>
            Keep all your classes, meetings, and personal plans in one
            easy-to-use calendar.
          </p>
        </div>
        <div className="home-card3">
          <span class="material-symbols-outlined">
            add_alert
          </span>
          <h2> Reminders</h2>
          <p>
            Set reminders for important events so you're always prepared
            and on time.
          </p>
        </div>
      </div>
      <div className="how-it-works">
        <div>
          <button> . </button>
          <button> . </button>
          <button> . </button>
        </div>
      </div>
      <footer> 
      </footer>
    </div>
  );

}


export default Home;