
import './style/Calendarstyle.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {

            const response = await fetch(
                `https://simplecal-nf6h.onrender.com/api/auth/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: email.trim(),
                        password: password.trim(),
                    }),
                }
            );

            const data = await response.json();

            // Login failed
            if (!response.ok) {
                alert(data.message);
                return;
            }

            // Save JWT token
            localStorage.setItem("token", data.token);

            // Go to calendar
            navigate("/calendar");

        } catch (error) {
            console.error(error);
            alert("Something went wrong. Please try again.");
        }
    };

    return (

        <div className="login-container">
           <div className="login-background">
            <p>Login</p>
            </div>
            <div className="login-inputs">
            <div className="cal-logo-title">
              <span className="material-symbols-outlined">
                            calendar_month
                 </span>
               <p className="cal-title"> SimpleCal </p>
              </div>
            <form className="login-form" onSubmit={handleLogin}>
       
                <label>Email</label>

                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />


                <label>Password</label>

                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />


                <button type="submit">
                    Login
                </button>
            
            </form>
            <div className="login-noaccount">
            <p>
                Have you not registered yet?
            </p>
        
            <button onClick={() => navigate("/signup")}>
                Sign up
            </button>
            </div>
            </div>
        </div>
    );
}

export default Login;

