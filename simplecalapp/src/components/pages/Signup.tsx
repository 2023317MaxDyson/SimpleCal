import "./style/Calendarstyle.css";
import { useState, type ChangeEvent, type SubmitEvent} from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSignup = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://simplecal-nf6h.onrender.com/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      // Account was successfully created
      alert("Account created successfully!");

      // Take user to Login page
      navigate("/login");
    } catch (error: unknown) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleUsernameChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <div className="signup-container">
        <div className="signup-background">
          <p>Signup</p>
        </div>

        <div className="signup-inputs">
          <div className="cal-logo-title">
            <span className="material-symbols-outlined">
              calendar_month
            </span>

            <p className="cal-title">
              SimpleCal
            </p>
          </div>

          <form
            className="signup-form"
            onSubmit={handleSignup}
          >
            <label htmlFor="username">
              Username
            </label>

            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              required
            />

            <label htmlFor="email">
              Email
            </label>

            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              required
            />

            <label htmlFor="password">
              Password
            </label>

            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />

            <button type="submit">
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
