function Footer(){
return(
  <div>
 <footer className="cal-footer">
        <div className="footer-left">
          <p>© 2026 SimpleCal</p>
          <p>Created by Max Dyson</p>
          <a
            href="https://github.com/2023317MaxDyson/SimpleCal"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
        <div className="footer-center">
          <b> Navigations </b>
          <a href="/event"> Create Events</a>
          <a href="/task"> Create Task</a>
          <a href="/appointment"> Create Appointments</a>
        </div>
        <div className="footer-right">
          <b> About</b>
          <p>
            SimpleCal is a calendar application that helps users organize events,
            track schedules, and manage their time efficiently.
          </p>
        </div>
      </footer>
      </div>
  );
}

export default Footer;