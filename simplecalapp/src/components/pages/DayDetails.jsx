import {useState, useEffect} from "react";
import { useParams, useNavigate} from "react-router-dom";

export default function DayDetails(){
    const {date} = useParams();
    const navigate = useNavigate();

    const [events, setEvents] = useState([]);

    return(
      <div className="cal-background">
      <div className="cal-header">
        <span className="material-symbols-outlined">
          calendar_month
        </span>
        <p className="cal-title"> SimpleCal </p>
        {/* Navigate back to the Calendar page */}
        <button className="events-calendar-btn" onClick={() => navigate("/")}>Calendar</button>
      </div>
      <div className="cal-main">
         <h2> Events for {new Date(date).toDateString()}</h2>
         </div>
      <footer className="cal-footer">
        <p> SimpleCal copyright@ 2026 </p>
      </footer>
    </div>
    );
}