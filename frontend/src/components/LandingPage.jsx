import React, { useState } from "react";
import AuthModal from "./AuthModal";

const LandingPage = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  const openAuth = (mode) => {
    setAuthMode(mode);
    setShowAuth(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex flex-col">
      {/* Hero Section */}
      <section className="py-24 px-6 text-center">
        <div className="w-36 h-36 md:w-44 md:h-44 rounded-full mx-auto mb-6 
                shadow-lg border-4 border-green-100 overflow-hidden">
  <img
    src="/brand.png"
    alt="App Logo"
    className="w-full h-full object-cover"
  />
</div>
        <h1 className="text-5xl font-extrabold text-green-800 mb-4">
          🍽️ Food Recipes
        </h1>
        <p className="text-xl text-gray-500 mb-8 max-w-xl mx-auto">
          Discover, cook, and share amazing recipes from around the world.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={() => openAuth("login")}
            className="bg-green-700 text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-green-800 shadow-md transition"
          >
            Login
          </button>
          <button
            onClick={() => openAuth("register")}
            className="border-2 border-green-700 text-green-700 px-8 py-3 rounded-full font-bold text-lg hover:bg-green-50 transition"
          >
            Sign Up
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow p-8 text-center flex-1">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Discover</h3>
            <p className="text-gray-500">Browse hundreds of recipes</p>
          </div>
          <div className="bg-white rounded-2xl shadow p-8 text-center flex-1">
            <div className="text-4xl mb-4">❤️</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Save Favourites</h3>
            <p className="text-gray-500">Keep your favourite recipes</p>
          </div>
          <div className="bg-white rounded-2xl shadow p-8 text-center flex-1">
            <div className="text-4xl mb-4">📤</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Share Recipes</h3>
            <p className="text-gray-500">Share your own creations</p>
          </div>
        </div>
      </section>

      <AuthModal
        show={showAuth}
        setShow={setShowAuth}
        initialMode={authMode}
      />
    </div>
  );
};

export default LandingPage;
