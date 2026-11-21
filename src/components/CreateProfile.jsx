
import React, { useState } from "react";
import UserService from "../service/UserService";
import "./css/CreateProfile.css";

function CreateProfile({ phoneNumber, userId, onProfileCreated }) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleCreateProfile = async (e) => {
        e.preventDefault();

        if (!name.trim() || !email.trim()) {
            setError("Please enter your name and email.");
            return;
        }

        if (!userId) {
            setError("User ID is missing. Please login again.");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const userData = {
                userName: name.trim(),
                email: email.trim()
            };

            const response = await UserService.createUser({
                    userName: name.trim(),
                    email: email.trim()
             });
            localStorage.setItem("userId", response.data.userid);
            console.log("Profile Updated:", response.data);

            onProfileCreated();

        } catch (error) {
            console.error("Profile Update Error:", error);

            setError(
                error.response?.data?.message ||
                "Unable to create profile. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
    <div className="create-profile-page">

        <div className="create-profile-card">

            <div className="profile-icon">
                <i className="fa-regular fa-user"></i>
            </div>

            <h2>Complete Your Profile</h2>

            <p className="profile-subtitle">
                You're almost there! Add your details
                to start connecting with your friends.
            </p>

            <form
                className="create-profile-form"
                onSubmit={handleCreateProfile}
            >

                <div>
                    <label>Full Name</label>
                    <input
                        type="text"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Email Address</label>
                    <input
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Phone Number</label>
                    <input
                        type="text"
                        value={phoneNumber}
                        readOnly
                    />
                </div>

                {error && (
                    <p className="create-profile-error">{error}</p>
                )}

                <button
                    type="submit"
                    className="create-profile-button"
                    disabled={loading}
                >
                    {loading ? "Saving Profile..." : "Create Profile →"}
                </button>

            </form>

            <p className="profile-footer">
                Your information is safe and secure with ChatConnect.
            </p>

        </div>

    </div>
);
}

export default CreateProfile;
