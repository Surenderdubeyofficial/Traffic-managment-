
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Ambulance,
  Menu,
  X,
  ShieldAlert,
  Home,
} from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-md fixed w-full z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="p-1.5 bg-emergency-red rounded-md">
            <Ambulance className="h-6 w-6 text-white" />
          </div>
          <span className="font-bold text-lg text-gray-800 hidden sm:inline">
            SETA
          </span>
          <span className="font-normal text-gray-500 hidden md:inline">
            Smart Emergency Traffic Assist
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-4 items-center">
          <Link to="/">
            <Button variant="ghost" className="flex gap-2 items-center">
              <Home size={18} />
              Home
            </Button>
          </Link>
          <Link to="/user-panel">
            <Button variant="ghost" className="flex gap-2 items-center">
              <Ambulance size={18} />
              Report Emergency
            </Button>
          </Link>
          <Link to="/authority-dashboard">
            <Button variant="outline" className="bg-emergency-blue text-white hover:bg-blue-700 flex gap-2 items-center">
              <ShieldAlert size={18} />
              Authority Login
            </Button>
          </Link>
        </nav>

        {/* Mobile menu button */}
        <Button variant="ghost" className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white border-t">
          <div className="flex flex-col">
            <Link to="/" onClick={toggleMenu}>
              <Button variant="ghost" className="w-full justify-start rounded-none py-4">
                <Home size={18} className="mr-2" />
                Home
              </Button>
            </Link>
            <Link to="/user-panel" onClick={toggleMenu}>
              <Button variant="ghost" className="w-full justify-start rounded-none py-4">
                <Ambulance size={18} className="mr-2" />
                Report Emergency
              </Button>
            </Link>
            <Link to="/authority-dashboard" onClick={toggleMenu}>
              <Button variant="ghost" className="w-full justify-start rounded-none py-4">
                <ShieldAlert size={18} className="mr-2" />
                Authority Login
              </Button>
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
