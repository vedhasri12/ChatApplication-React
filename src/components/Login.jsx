
import React, { useState } from "react";
import AuthService from "../service/AuthService";
import "./css/Login.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {

    const [phoneNumber, setPhoneNumber] = useState("");
    const [code, setCode] = useState("");
    const [step, setStep] = useState(1);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleContinue = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
        const response = await AuthService.checkPhoneNumber(phoneNumber);

        if (response.exists) {
            setStep(2);
        } else {
            setError(
                "Your phone number is not registered. Please create an account."
            );
        }

    } catch (err) {
        setError(
            err.response?.data?.message ||
            "Unable to check phone number. Please try again."
        );
    } finally {
        setLoading(false);
    }
};

    const handleVerify = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
        const response = await AuthService.loginUser({
            phoneNumber,
            code
        });

        console.log("Login response:", response);
        const token = response.token;
        const userId = response.userId;
        const username = response.username;

        if (!token) {
            throw new Error("JWT token not received from backend");
        }
        if (!userId) {
        throw new Error("User ID not received from backend");
    }

       console.log("JWT saved successfully");
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        localStorage.setItem("username", username || "");
        localStorage.setItem("phoneNumber", phoneNumber);
          console.log("Logged-in user ID:", userId);


        navigate("/dashboard", { replace: true });

    } catch (err) {
        console.error("Login failed:", err);

        setError(
            err.response?.data?.message ||
            err.message ||
            "Invalid authenticator code"
        );
    } finally {
        setLoading(false);
    }
};

    return (
        <div className="login-page">
            <div className="login-container">

                {step === 1 ? (

                    <>
                        <h2>Welcome Back</h2>

                        <p className="login-subtitle">
                            Login to your Chat Application
                        </p>

                        <form onSubmit={handleContinue}>

                            <label>Phone Number</label>

                            <input
                                type="tel"
                                placeholder="+91xxxxxxxxxx"
                                value={phoneNumber}
                                onChange={(e) =>
                                    setPhoneNumber(e.target.value)
                                }
                                required
                            />

                            <button type="submit">
                                Continue
                            </button>

                        </form>

                        <div className="signup-link">
                            New user?
                            <Link to="/register">Create an account</Link>
                        </div>
                    </>

                ) : (

                    <>
                        <h2>Two-Factor Authentication</h2>

                        <p className="login-subtitle">
                            Open your Google Authenticator app
                            and enter the six-digit code for your
                            Chat Application account.
                        </p>

                        <form onSubmit={handleVerify}>

                            <label>Authenticator Code</label>

                            <input
                                type="text"
                                placeholder="Enter 6-digit code"
                                value={code}
                                onChange={(e) =>
                                    setCode(
                                        e.target.value
                                            .replace(/\D/g, "")
                                            .slice(0, 6)
                                    )
                                }
                                maxLength="6"
                                inputMode="numeric"
                                required
                            />

                            <button
                                type="submit"
                                disabled={loading || code.length !== 6}
                            >
                                {loading ? "Verifying..." : "Verify & Login"}
                            </button>

                        </form>

                        <button
                            type="button"
                            className="back-button"
                            onClick={() => {
                                setStep(1);
                                setCode("");
                                setError("");
                            }}
                        >
                            Back
                        </button>
                    </>
                )}

                {error && (
                    <p className="login-error">{error}</p>
                )}

            </div>
        </div>
    );
};

export default Login;
