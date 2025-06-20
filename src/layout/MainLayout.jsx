import React, { useState } from 'react';
import { Header } from './Header';
import { Footer } from './footer';
import { Outlet } from 'react-router-dom';
import AuthModal from '../components/authModal';

export default function MainLayout() {
  const [showModal, setShowModal] = useState(false);
  // const [isLogin, setIsLogin] = useState(true);

  return (
    <div>
      <Header onProfileClick={() => setShowModal(true)} />

      <Outlet />

      <Footer />

      {/* Auth Modal */}
      <AuthModal
        show={showModal}
        onClose={() => setShowModal(false)}
        // isLogin={isLogin}
        // toggleForm={() => setIsLogin(!isLogin)}
      />
    </div>
  );
}
