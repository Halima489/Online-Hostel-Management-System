
import { useState } from "react";
import HostelAuthPage from "./HostelAuthPage";
import StudentDashboard from "./StudentDashboard";

export default function App() {
  // প্রথামিক স্টেট সবসময় false থাকবে
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (credentials) => {
    console.log("Logged in with:", credentials);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    // key={isLoggedIn} যুক্ত করার কারণে স্টেট চেঞ্জ বা রিলোডে ব্রাউজার একদম ফ্রেশ পেজ দেখাবে
    <div key={isLoggedIn ? "dashboard" : "auth"}>
      {isLoggedIn ? (
        <StudentDashboard 
          onLogout={handleLogout}
          onSubmitComplaint={(c) => console.log("New Complaint:", c)}
          onSubmitRoomChange={(r) => console.log("Room Change Request:", r)}
          onPayNow={(item) => console.log("Processing payment:", item)}
        />
      ) : (
        <HostelAuthPage 
          onLogin={handleLogin}
          onRegister={(data) => {
            console.log("Registered:", data);
            setIsLoggedIn(true);
          }}
        />
      )}
    </div>
  );
}