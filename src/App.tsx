import React, { useState } from 'react';
import { 
  Home, 
  Settings, 
  Building, 
  Search, 
  Calendar,
  Building2,
  Menu,
  User,
  Infinity
} from 'lucide-react';
import { ChatWidget } from './components/ChatWidget';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold">PropertyLoop</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-600 hover:text-gray-900">Pricing</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Lettings Service</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Property Search</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Property Management</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Landlord Portal</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Join As An Agent</a>
            </div>
            <div className="flex items-center space-x-4">
              <Menu className="h-6 w-6 md:hidden" />
              <User className="h-6 w-6" />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div 
        className="relative pt-32 pb-32 flex content-center items-center justify-center"
        style={{
          minHeight: "100vh",
          backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="absolute top-0 w-full h-full bg-black opacity-50"></div>
        <div className="container relative mx-auto">
          <div className="items-center flex flex-wrap">
            <div className="w-full px-4 ml-auto mr-auto text-center">
              <div className="pr-12">
                <h1 className="text-white font-semibold text-5xl mb-8">
                  Home of The Best Local Estate Agents
                </h1>
                <h2 className="text-white text-3xl mb-12">
                  What would you like to do?
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Cards */}
      <div className="container mx-auto px-4 -mt-32 relative z-10">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
            <div className="bg-white rounded-lg p-8 shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
              <Home className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Looking for a tenant</h3>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
            <div className="bg-white rounded-lg p-8 shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
              <Settings className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Manage my tenancy</h3>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
            <div className="bg-white rounded-lg p-8 shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
              <Building className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Want to sell</h3>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
            <div className="bg-white rounded-lg p-8 shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
              <Search className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Book a valuation</h3>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
            <div className="bg-white rounded-lg p-8 shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
              <Calendar className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Looking to buy</h3>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
            <div className="bg-white rounded-lg p-8 shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
              <Building2 className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Find a property to rent</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Infinity Button */}
      <button 
        onClick={() => setIsChatOpen(true)} 
        className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 z-50"
      >
        <Infinity className="h-6 w-6" />
      </button>

      {/* Rent Achievement Section */}
      <div className="bg-gray-100 py-20 mt-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-semibold text-center mb-12">
            How much rent can you achieve?
          </h2>
        </div>
      </div>
      <ChatWidget isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
    </div>
  );
}

export default App;

