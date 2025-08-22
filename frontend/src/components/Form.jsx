import { useState } from "react";
import api from "../api";  
import { useNavigate } from "react-router-dom"; 
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"; 
import "../styles/Form.css"; 
import LoadingIndicator from "./LoadingIndicator";

function Form({ route, method }) {
    // State variables to store entered username and password
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // State to track if the form submission is in progress (loading)
    const [loading, setLoading] = useState(false);

    // Determine the display name based on form purpose
    const name = method === "login" ? "Login" : "Register";

    // Initialize navigate function for programmatic redirects
    const navigate = useNavigate();

    // Form submission handler (async)
    const handleSubmit = async (e) => {
        // Prevent default form submit behavior (page reload)
        e.preventDefault();

        // Set loading state to true to indicate submission in progress
        setLoading(true);

        try {
            // Send POST request to specified route with username and password
            const res = await api.post(route, { username, password });

            // If method is login, store tokens and redirect to home page
            if (method === "login") {
                // Save access and refresh tokens to localStorage
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                // Redirect user to the home page after successful login
                navigate("/");
            } else {
                // If method is register, redirect user to the login page after registration
                navigate("/login");
            }

        } catch (error) {
            // Log any errors (e.g., network or validation errors)
            console.log(error);
        } finally {
            // Set loading state back to false regardless of success or failure
            setLoading(false);
        }
    };

    // JSX rendering the form UI
    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>{name}</h1>
            <input
                className="form-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}  // Update username state on input change
                placeholder="Username"
            />
            <input
                className="form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}  // Update password state on input change
                placeholder="Password"
            />
            {loading && <LoadingIndicator/>}
            <button className="form-button" type="submit" disabled={loading}>
                {name}
            </button>
        </form>
    );
}

export default Form;