import React from "react";
import { ArrowRight, MapPin, Camera, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FeatureCard from "../components/FeatureCard";

const HomePage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl font-bold mb-4">
                Make Your Community Cleaner
              </h1>
              <p className="text-gray-600 mb-6">
                Join our mission to identify and clean areas that need
                attention.
              </p>
              <button
                onClick={handleGetStarted}
                className="flex items-center bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
              >
                Get Started
                <ArrowRight className="ml-2" size={20} />
              </button>
            </div>
            <div className="md:w-1/2 h-64 overflow-hidden">
              <img
                src="../../images/kidscleaning.jpg"
                alt="Community Cleaning"
                className="rounded-lg shadow-lg w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={Camera}
              title="Post Areas"
              description="Upload photos of areas that need cleaning"
            />
            <FeatureCard
              icon={MapPin}
              title="Mark Location"
              description="Tag the exact location using Google Maps"
            />
            <FeatureCard
              icon={MessageCircle}
              title="Collaborate"
              description="Join chat rooms to coordinate cleanup"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
