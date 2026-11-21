
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./css/Dashboard.css";
import UserService from "../service/UserService";

function Dashboard() {

    const [activePage, setActivePage] = useState("chats");
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {

        const   fetchUserProfile = async () => {

            try {
                const userId = localStorage.getItem("userId");
                const token = localStorage.getItem("token");

                if (!userId || !token) {
                    navigate("/login", { replace: true });
                    return;
                }

                const response = await axios.get(
                  "http://localhost:8080/api/users/getUser",
                 { 
                    params: { userId },
                    headers: {
                       Authorization: `Bearer ${token}`
                    }
                  }
                );

                console.log("Profile response:", response.data);
                setUser(response.data);
                console.log("Profile API response:", response.data);

                setUser(response.data);

            } catch (err) {
                console.error("Profile fetch failed:", err);
                setError(
                    err.response?.data?.message ||
                    "Unable to load user profile"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();

    }, [navigate]);

    const handleLogout = () => {
       
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem("phoneNumber");

   

        navigate("/login", { replace: true });
    };

    if (loading) {
        return <div className="dashboard-loading">Loading profile...</div>;
    }

    if (error) {
        return <div className="dashboard-error">{error}</div>;
    }

    if (!user) {
        return null;
    }

    const username = user.userName || "User";
    const firstLetter = username.charAt(0).toUpperCase();

    return (
        <div className="dashboard-layout">

            {/* Sidebar */}
            <aside className="sidebar">

                <div className="sidebar-logo">
                    <h2>ChatConnect</h2>
                </div>

                <div className="sidebar-user">

                    <div className="profile-avatar">
                        {firstLetter}
                    </div>

                    <div>
                        <h4>{username}</h4>
                        <span>{user.phoneNumber}</span>
                    </div>

                </div>

                <nav className="sidebar-menu">

                    <button
                        className={activePage === "profile" ? "active" : ""}
                        onClick={() => setActivePage("profile")}
                    >
                        <span>👤</span> My Profile
                    </button>

                    <button
                        className={activePage === "chats" ? "active" : ""}
                        onClick={() => setActivePage("chats")}
                    >
                        <span>💬</span> Chats
                    </button>

                </nav>

                <div className="sidebar-footer">
                    <button onClick={handleLogout}>
                        🚪 Logout
                    </button>
                </div>

            </aside>

            {/* Main Content */}
            <main className="dashboard-content">

                {activePage === "profile" ? (

                    <div className="profile-page">

                        <h1>My Profile</h1>

                        <div className="profile-card">

                            {user.pictureImg ? (
                                <img
                                    src={user.pictureImg}
                                    alt="Profile"
                                    className="large-avatar"
                                />
                            ) : (
                                <div className="large-avatar">
                                    {firstLetter}
                                </div>
                            )}

                            <h2>{user.userName}</h2>

                            <div className="profile-detail">
                                <strong>User ID</strong>
                                <p>{user.userId}</p>
                            </div>

                            <div className="profile-detail">
                                <strong>Username</strong>
                                <p>{user.userName}</p>
                            </div>

                            <div className="profile-detail">
                                <strong>Email</strong>
                                <p>{user.email}</p>
                            </div>

                            <div className="profile-detail">
                                <strong>Phone Number</strong>
                                <p>{user.phoneNumber}</p>
                            </div>

                            <div className="profile-detail">
                                <strong>Created At</strong>
                                <p>{user.createdAt || "Not available"}</p>
                            </div>

                        </div>

                    </div>

                ) : (

                    <div className="chat-page">

                        <div className="chat-list">

                            <h2>Chats</h2>

                            <input
                                type="text"
                                placeholder="Search conversations..."
                            />

                            <div className="empty-chat-list">
                                <p>No conversations yet.</p>
                                <span>Your chats will appear here.</span>
                            </div>

                        </div>

                        <div className="chat-window">

                            <div className="chat-welcome">
                                <div className="chat-icon">💬</div>

                                <h2>Welcome, {username}!</h2>

                                <p>
                                    Select a conversation to start chatting.
                                </p>
                            </div>

                        </div>

                    </div>

                )}

            </main>

        </div>
    );
}

export default Dashboard;
