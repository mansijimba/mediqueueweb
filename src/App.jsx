// App.jsx
import React, { useState } from "react";
import AuthModal from "./components/authModal"; // adjust path if needed

export default function App() {
  // const [isLogin, setIsLogin] = useState(true);     
  const [showModal, setShowModal] = useState(true); 

  return (
    <>
      <button onClick={() => setShowModal(true)}>Open Modal</button>

      <AuthModal
        show={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}
