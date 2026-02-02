import "./App.css";
import React, { useState } from "react";
import Feed from "./components/Feed";
import Auth from "./components/Auth";

function App() {
  const [user, setUser] = useState(null);

  return (
    <div style={{ maxWidth: "720px",
    margin: "50px auto",
    padding: "30px",
    background: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 12px 32px rgba(0, 0, 0, 0.08)" }}>
      {user ? (
        <>
          <h2>Social Feed</h2>
          <Feed user={user} />
        </>
      ) : (
        <Auth onAuthSuccess={setUser} />
      )}
    </div>
  );
}

export default App;


