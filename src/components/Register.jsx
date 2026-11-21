import React, { useState } from "react";
import  AuthService from "../service/AuthService";
import { useNavigate } from "react-router-dom";
import "./css/Register.css";

const Register = () => {

    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        phoneNumber: ""
    });

    const [qrCode, setQrCode] = useState("");
    const [enrollmentId, setEnrollmentId] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");
        setMessage("");
        setQrCode("");

        try {
            const data = await AuthService.registerUser(formData);

            setMessage(data.message);
            setQrCode(data.qrCode);
            setEnrollmentId(data.enrollmentId);

        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Registration failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

   return (
    <div className="register-page">

        <div className="register-container">

            <h2>Create Account</h2>

            <p className="register-subtitle">
                Sign up to get started with Chat Application
            </p>

            <form className="register-form" onSubmit={handleRegister}>

                <input
                    type="text"
                    name="userName"
                    placeholder="Full Name"
                    value={formData.userName}
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="tel"
                    name="phoneNumber"
                    placeholder="+91xxxxxxxxxx"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Generating QR..." : "Create Account"}
                </button>

            </form>

            {error && (
                <p className="register-error">{error}</p>
            )}

            {message && (
                <p className="register-message">{message}</p>
            )}

            {qrCode && (
                <div className="totp-setup">

                    <h3>Set Up Two-Factor Authentication</h3>

                    <img
                        src={`data:image/png;base64,${qrCode}`}
                        alt="TOTP QR Code"
                    />

                    <p>
                        Open Google Authenticator, tap the + icon,
                        and scan this QR code.
                    </p>
                     <button
                        type="button"
                        onClick={() =>
                        navigate("/verify-totp", {
                       state: { enrollmentId }
                    })
                 }
                  >
                  I Have Scanned the QR Code
                </button>

                </div>
            )}

        </div>

    </div>
);
};

export default Register;