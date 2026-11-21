
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthService from "../service/AuthService";
import "./css/Login.css";

const VerifyTotp = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const enrollmentId = location.state?.enrollmentId;

    const [code, setCode] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleVerify = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
          console.log("Enrollment ID:", enrollmentId);
           console.log("Entered code:", code);
            const response = await AuthService.verifyRegistration({
                enrollmentId,
                code
            });

            localStorage.setItem("token", response.token);

            navigate("/dashboard");

        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Invalid authenticator code. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    if (!enrollmentId) {
        return (
            <div className="login-page">
                <div className="login-container">
                    <h2>Registration session expired</h2>
                    <p>Please register again.</p>
                    <button onClick={() => navigate("/register")}>
                        Create Account
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="login-page">
            <div className="login-container">

                <h2>Verify Your Account</h2>

                <p className="login-subtitle">
                    Open Google Authenticator on your phone.
                    Enter the six-digit code displayed for your
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
                        {loading ? "Verifying..." : "Verify Account"}
                    </button>

                </form>

                {error && (
                    <p className="login-error">{error}</p>
                )}

            </div>
        </div>
    );
};

export default VerifyTotp;
