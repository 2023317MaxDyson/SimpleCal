import './style/Calendarstyle.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Signup() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`https://simplecal-nf6h.onrender.com/api/auth/signup`,
                {
                    method: "POST", 
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        username, email, password
                    })
                });
        
                const data = await response.json();

            if (!response.ok) {
                alert(data.message);
                return;
            }
           
            // Account was successfully created 
            alert("Account created successfully!");
          
            //  Take user to Login page 
            navigate("/login");

        } catch (error) {
            console.error(error);
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <div>
            <div className="signup-container">
                <div className="signup-background">
                    <p> Signup </p>
                </div>
                <div className="signup-inputs">
                    <div className="cal-logo-title">
                        <span className="material-symbols-outlined">
                            calendar_month
                        </span>
                        <p className="cal-title"> SimpleCal </p>
                    </div>
                    <form className="signup-form" onSubmit={handleSignup}>
                        <label> Username </label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        <label> Email </label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <label> Password </label>
                        <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                        <button> Create Account </button>
                    </form>
                </div>
            </div>
        </div>

    );
}

export default Signup;