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
        <div className="home-logo">
        <span className="material-symbols-outlined">
          calendar_month
        </span>
        <p>SimpleCal</p>
        </div>
        <div className="home-navbuttons"> 
        <button onClick={() => navigate("/login")}>
          Login
        </button>
        <button onClick={() => navigate("/signup")}>
          Sign Up
        </button>
        </div>
      </div>
      <div className="home-herosection">
        <img className="home-herosection-img" src="http://localhost:3000/img/herosection.jpg" alt="Hero Section" />
        <div>
        <h1> Make planning easy, enjoyable, and <span className="home-stress">stress free</span></h1>
        <p> Plan smarter, stay on top of every event, and spend less time worrying about your schedule. </p>
        <button onClick={() => navigate("/signup")}>
          Signup Today!!
        </button>
        </div>
      </div>
      <div className="home-featurecards">
        <div className="home-card">
          <span class="material-symbols-outlined">
            note_alt
          </span>
          <h2> Smart Scheduling</h2>
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
        <img src="" />
        <div>
          <button> </button>
          <button>  </button>
          <button>  </button>
        </div>
      </div>
      <footer> 
        <p> © 2026 SimpleCal <br/>
Created by Max Dyson
<br/>
https://github.com/2023317MaxDyson/SimpleCal
</p>
<p> 
<b>  About </b>
<br/>
SimpleCal is a calendar application that helps <br/>
users organize events, track schedules, and <br/> 
manage their time efficiently.
</p>
      </footer>
    </div>
  );

}


export default Home;