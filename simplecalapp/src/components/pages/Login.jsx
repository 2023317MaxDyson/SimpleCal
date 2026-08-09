
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
                        email,
                        password,
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

            <h1>SimpleCal</h1>

            <form onSubmit={handleLogin}>

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


            <p>
                Have you not registered yet?
            </p>

            <button onClick={() => navigate("/signup")}>
                Sign up
            </button>
        </div>
    );
}

export default Login;

