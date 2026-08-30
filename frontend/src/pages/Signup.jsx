import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [campus, setCampus] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            await API.post("/auth/signup", {
                name,
                email,
                password,
                campus
            });

            setMessage("Signup successful! Redirecting...");

            setTimeout(() => {
                navigate("/login");
            }, 1000);

        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Signup failed"
            );
        }
    };

    return (
        <div className="auth-page">

            <form
                className="auth-card"
                onSubmit={handleSignup}
            >

                <h1>Join SwapZone 🎓</h1>

                <p>
                    Create your student marketplace account
                </p>

                {message && (
                    <div className="message">
                        {message}
                    </div>
                )}

                <label>Name</label>

                <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) =>
                        setName(e.target.value)
                    }
                    required
                />

                <label>Email</label>

                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                    required
                />

                <label>Password</label>

                <input
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                    required
                />

                <label>Campus / University</label>

                <input
                    type="text"
                    placeholder="e.g. Osmania University"
                    value={campus}
                    onChange={(e) =>
                        setCampus(e.target.value)
                    }
                    required
                />

                <button type="submit">
                    Create Account
                </button>

                <p>
                    Already have an account?{" "}
                    <Link to="/login">
                        Login
                    </Link>
                </p>

            </form>

        </div>
    );
}

export default Signup;